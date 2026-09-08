// References to the canvas element (ID for the <canvas> in index.html) and gets its context
const canvas = document.getElementById("Begin");
const ctx = canvas.getContext("2d");

const ant1 = {x:50, y:70};
const ant2 = {x:10, y:20};

const colony = [ant1, ant2]



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
    });


    // To check if the func is looping - Uncomment to check:
    // console.log("Hello")  

    // Call back unto itself to have an infinite loop
    requestAnimationFrame(loop);
}


requestAnimationFrame(loop);
