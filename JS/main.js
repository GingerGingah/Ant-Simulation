// References to the canvas element (ID for the <canvas> in index.html) and gets its context
const canvas = document.getElementById("Begin");
const ctx = canvas.getContext("2d");

// Creates the colony //
function createAnt()
{
    return {x:Math.floor(Math.random() * 800) + 1 , y:Math.floor(Math.random() * 600) + 1 , angle:Math.random() * (2 * Math.PI), size:5};
}

const antCount = 100; // Change this to change the base amount of ants spawned
const colony = [];
for (let i = 0; i < antCount; i++) 
{
    colony.push(createAnt());
}


// Main Body //
function loop()
{
    // Fills the background to a solid colour
    ctx.fillStyle ="Green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Display an ant for each one in the colony
    colony.forEach(function(ant) {
        ctx.fillStyle ="Brown";
        ctx.beginPath();
        ctx.arc(ant.x, ant.y, ant.size, 0, 2 * Math.PI);
        ctx.fill();

        
        let tempX = ant.x + Math.cos(ant.angle) * 0.5;
        let tempY = ant.y + Math.sin(ant.angle) * 0.5;
        
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