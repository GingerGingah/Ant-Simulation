// References to the canvas element (ID for the <canvas> in index.html) and gets its context //
const canvas = document.getElementById("Begin");
const ctx = canvas.getContext("2d");

// BG
const bgImg = new Image();
bgImg.src = "img/background.png";


// Pheromones System //
const cellSize = 5;
const cols = Math.floor(canvas.width / cellSize);
const rows = Math.floor(canvas.height / cellSize);

const pheroHome = new Array(cols * rows).fill(0);

function getIndex(x, y)
{
    let c = Math.floor(x / cellSize); // columns
    let r = Math.floor(y / cellSize); // rows
    return r * cols + c
}



// Ant Creation & Deletion Method //
// Our cute ant art:
const antImg = new Image();
antImg.src = 'img/ant.png';

const turnStrength = 0.1;
const colony = [];
const corpses = [];

function antCreationContainer()
{
    return {x:Math.floor(Math.random() * 800) + 1 , y:Math.floor(Math.random() * 600) + 1 , angle:Math.random() * (2 * Math.PI), size:10, speed:0.5, sensorDist:20, sensorFOV:Math.PI / 4};
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