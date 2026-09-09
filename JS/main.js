// References to the canvas element (ID for the <canvas> in index.html) and gets its context //
const canvas = document.getElementById("Begin");
const ctx = canvas.getContext("2d");

// Vars //
const colony = [];
const corpses = [];
// Our cute ant:
const img = new Image();
img.src = 'img/ant.png';


// Ant Creation & Deletion Method //
function antCreationContainer()
{
    return {x:Math.floor(Math.random() * 800) + 1 , y:Math.floor(Math.random() * 600) + 1 , angle:Math.random() * (2 * Math.PI), size:10, speed:0.5};
}

function antCreate()
{
    colony.push(antCreationContainer())
}

function antDelete()
{
    return colony.pop()
}

function antDeath(ant) 
{
    if (!ant) return;
    corpses.push({ x: ant.x, y: ant.y, size: ant.size, life: 3});

    console.log(`Ant died at (${ant.x}, ${ant.y})`);
}


// Create Ant Button
const addAntButton=document.getElementById("addAntBtn");
addAntButton.addEventListener("click", function()
    {
        antCreate();
        console.log("Ant Added! Ant Count: " + colony.length)
    });

// Delete Ant Button
const deleteAntButton=document.getElementById("deleteAntBtn");
deleteAntButton.addEventListener("click", function()
    {
        const dead = antDelete();
        antDeath(dead);

        console.log("Ant Deleted! Ant Count: " + colony.length)
    });



// Main Body //
function loop()
{

    // Fills the background to a solid colour
    ctx.fillStyle ="Green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Corpse stays on screen for a short while
    for (let i = corpses.length - 1; i >= 0; i--) {
        const c = corpses[i];
        c.life -= 0.05; // fade speed
        if (c.life <= 0) {
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
    colony.forEach(function(ant) {
        ctx.save();
        ctx.translate(ant.x, ant.y);
        ctx.rotate(ant.angle + Math.PI / 2);   
        ctx.drawImage(img, -ant.size / 2, -ant.size / 2, ant.size, ant.size);
        ctx.restore();   

        
        let tempX = ant.x + Math.cos(ant.angle) * ant.speed;
        let tempY = ant.y + Math.sin(ant.angle) * ant.speed;
        
        ant.angle += ( Math.random() - 0.5 ) * 0.5

        
        // Clamping to the edges so the bodies of the ants cannot go past
        // Ants go in a straight line towards a random angle they're pointed in at a speed of 0.5 which is changed every frame
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
            ant.x = tempX
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
            ant.y = tempY
        }
    });


    
    // Call back unto itself to have an infinite loop
    requestAnimationFrame(loop);
}


// Begin loop
requestAnimationFrame(loop);