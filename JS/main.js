// References to the canvas element (ID for the <canvas> in index.html) and gets its context
const canvas = document.getElementById("Begin");
const ctx = canvas.getContext("2d");

// Colony Creation
const ant1 = {x:50, y:70, angle:Math.random() * (2 * Math.PI)};
const ant2 = {x:10, y:20, angle:Math.random() * (2 * Math.PI)};
const colony = [ant1, ant2]

// Debugging purposes - to see the ants properties:
colony.forEach(function(ant)
{
    console.log(ant.x,ant.y,ant.angle)
});

function loop()
{
    // Fills the background to a solid colour
    ctx.fillStyle ="Green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Display an ant for each one in the colony
    colony.forEach(function(ant) {
        ctx.fillStyle ="Brown";
        ctx.beginPath();
        ctx.arc(ant.x, ant.y, 5, 0, 2 * Math.PI);
        ctx.fill();

        // Ants go in a straight line towards a random angle they're pointed in at a speed of 0.5 which is changed every frame
        ant.x += Math.cos(ant.angle) * 0.5
        ant.y += Math.sin(ant.angle) * 0.5
        ant.angle += ( Math.random() - 0.5 ) * 0.5
    });


    // To check if the func is looping - Uncomment to check:
    // console.log("Hello")  

    // Call back unto itself to have an infinite loop
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
