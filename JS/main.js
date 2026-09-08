// References to the canvas element (ID for the <canvas> in index.html) and gets its context
const canvas = document.getElementById("Begin");
const ctx = canvas.getContext("2d");

// Fills the background to a solid colour
ctx.fillStyle ="Green";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// The First Ant...
ctx.fillStyle ="Brown";
ctx.beginPath();
ctx.arc(100, 75, 5, 0, 2 * Math.PI);
ctx.fill();
