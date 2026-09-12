// Main Body //
function loop()
{
    // Background image
    ctx.drawImage(bgImg, 0, 0, 800, 600);

    // Nest System //
    ctx.fillStyle = "Brown";
    ctx.fillRect(antNest.x - (antNest.size / 2), antNest.y - (antNest.size / 2), antNest.size, antNest.size);

    // The Ants Brain //
    // Corpse stays on screen for a short while
    for (let i = corpses.length - 1; i >= 0; i--)
    {
        const c = corpses[i];
        c.life -= 0.05; // fade speed
        if (c.life <= 0)
        {
            corpses.splice(i, 1);
            continue;
        }
        ctx.save();
        ctx.globalAlpha = c.life;
        ctx.fillStyle = "#adab0d";
        ctx.fillRect(c.x - c.size / 2, c.y - c.size / 2, c.size, c.size);
        ctx.restore();
    }

    // Display an ant for each one in the colony
    colony.forEach(function (ant)
    {
        // Draw the ant image
        ctx.save();
        ctx.translate(ant.x, ant.y);
        ctx.rotate(ant.angle + Math.PI / 2);
        ctx.drawImage(antImg, -ant.size / 2, -ant.size / 2, ant.size, ant.size);
        ctx.restore();

        // Calculate future movements
        let tempX = ant.x + Math.cos(ant.angle) * ant.speed;
        let tempY = ant.y + Math.sin(ant.angle) * ant.speed;

        // Clamping to the edges so the bodies of the ants cannot go past
        if (tempX > canvas.width)
        {
            ant.angle = Math.PI - ant.angle;
            ant.x = canvas.width - ant.size;
        }
        else if (tempX < 0)
        {
            ant.angle = Math.PI - ant.angle;
            ant.x = ant.size;
        }
        else
        {
            ant.x = tempX;
        }

        if (tempY > canvas.height)
        {
            ant.angle = -ant.angle;
            ant.y = canvas.height - ant.size;
        }
        else if (tempY < 0)
        {
            ant.angle = -ant.angle;
            ant.y = ant.size;
        }
        else
        {
            ant.y = tempY;
        }

        // Pheromone System //
        let senseGrid = (ant.hasFood === true) ? pheroHome : pheroFood;
        let foodStrength = Math.max(0, 1 - (ant.tripTicks / gradientRange));

        let currentWanderRange = (foodEverFound) ? wanderRangeFound : wanderRangeUnfound;
        let tooFarWander = Math.min(1, ant.wanderTicks / currentWanderRange);

        // Calculate pheromones ahead of them
        let aheadX = ant.x + Math.cos(ant.angle) * ant.sensorDist;
        let aheadY = ant.y + Math.sin(ant.angle) * ant.sensorDist;
        let senseAhead = senseGrid[getIndex(aheadX, aheadY)];

        let leftX = ant.x + Math.cos(ant.angle - ant.sensorFOV) * ant.sensorDist;
        let leftY = ant.y + Math.sin(ant.angle - ant.sensorFOV) * ant.sensorDist;
        let senseLeft = senseGrid[getIndex(leftX, leftY)];

        let rightX = ant.x + Math.cos(ant.angle + ant.sensorFOV) * ant.sensorDist;
        let rightY = ant.y + Math.sin(ant.angle + ant.sensorFOV) * ant.sensorDist;
        let senseRight = senseGrid[getIndex(rightX, rightY)];

        let signalStrength = senseAhead + senseLeft + senseRight;
        let wanderAmount = 0.5 / (1 + signalStrength * 3);

        // Wander
        ant.angle += (Math.random() - 0.5) * wanderAmount;

        // Deposit specific pheromones
        if (ant.hasFood === false)
        {
            pheroHome[getIndex(ant.x, ant.y)] += 0.1;
        }
        else if (ant.hasFood === true)
        {
            pheroFood[getIndex(ant.x, ant.y)] += 0.1 * foodStrength;
        }

        // Follow pheromones
        ant.angle += (senseRight - senseLeft) * steerStrength;

        // Homing / wandering-pull logic
        if (ant.hasFood === true)
        {
            ant.tripTicks += ant.speed;

            let dx = antNest.x - ant.x;
            let dy = antNest.y - ant.y;
            let targetAngle = Math.atan2(dy, dx);

            let angleDiff = targetAngle - ant.angle;
            angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));

            ant.angle += angleDiff * homeStrength;

            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < antNest.size / 2 + ant.size / 2)
            {
                ant.hasFood = false;
                antNest.foodStore += 1;
                ant.angle += Math.PI;
                console.log(`Ant deposited food, total food in nest: ${antNest.foodStore}`);
            }
        }
        else
        {
            ant.wanderTicks += ant.speed;

            let dx = antNest.x - ant.x;
            let dy = antNest.y - ant.y;
            let targetAngle = Math.atan2(dy, dx);

            let angleDiff = targetAngle - ant.angle;
            angleDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));

            ant.angle += angleDiff * tooFarWander * wanderHomeStrength;

            let nestDistance = Math.sqrt(dx * dx + dy * dy);
            if (nestDistance < antNest.size / 2 + ant.size / 2)
            {
                ant.wanderTicks = 0;
            }
        }

        // Food System - Check to hold food and bring back to colony //
        foodSpawned.forEach(function (food)
        {
            if (ant.hasFood === false)
            {
                let dx = food.x - ant.x;
                let dy = food.y - ant.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < food.size / 2 + ant.size / 2 && food.amount > 0)
                    {
                        ant.hasFood = true;
                        ant.tripTicks = 0;
                        ant.wanderTicks = 0;
                        food.amount -= 1;
                        foodEverFound = true;
                        console.log(`Ant grabbed a piece of food at ${food.x}, ${food.y}. Total left: ${food.amount}`);
                        ant.angle += Math.PI;
                    }
            }
        });
    });

    // Pheromones draw & decay
    pheroHome.forEach(function (value, index)
    {
        let row = Math.floor(index / cols);
        let col = index % cols;
    
        if (showPheromones)
        {
            ctx.save();
            ctx.fillStyle = "black";
            if (value > 0)
            {
                ctx.globalAlpha = value;
                ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
            ctx.restore();
        }
    
        pheroHome[index] *= 0.99;
    });
    
    pheroFood.forEach(function (value, index)
    {
        let row = Math.floor(index / cols);
        let col = index % cols;
    
        if (showPheromones)
        {
            ctx.save();
            ctx.fillStyle = "orange";
            if (value > 0)
            {
                ctx.globalAlpha = value;
                ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            }
            ctx.restore();
        }
    
        pheroFood[index] *= 0.9997;
    });

    // Food System - Drawing, shrinking, and removal //
    for (let i = foodSpawned.length - 1; i >= 0; i--)
    {
        const food = foodSpawned[i];

        if (food.amount <= 0)
        {
            foodSpawned.splice(i, 1);
            continue;
        }

        let scale = food.amount / food.amountMax;
        let drawSize = Math.max(2, food.size * scale);

        ctx.fillStyle = "red";
        ctx.fillRect(food.x - drawSize / 2, food.y - drawSize / 2, drawSize, drawSize);
    }

    // Call back unto itself to have an infinite loop
    requestAnimationFrame(loop);
}

// Begin loop
requestAnimationFrame(loop);