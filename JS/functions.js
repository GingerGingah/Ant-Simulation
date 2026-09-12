// References to the canvas element (ID for the <canvas> in index.html) and gets its context //
const canvas = document.getElementById("Begin");
const ctx = canvas.getContext("2d");

// BG
const bgImg = new Image();
bgImg.src = "img/background.png";


// Nest System //
const antNest = { x: canvas.width / 2, y: canvas.height / 2, size: 30, foodStore: 0 };


// Pheromones System //
const cellSize = 5;
const cols = Math.floor(canvas.width / cellSize);
const rows = Math.floor(canvas.height / cellSize);

const pheroHome = new Array(cols * rows).fill(0);
const pheroFood = new Array(cols * rows).fill(0);

function getIndex(x, y)
{
    let c = Math.floor(x / cellSize); // columns
    let r = Math.floor(y / cellSize); // rows
    let clampedC = Math.max(0, Math.min(c, cols - 1));
    let clampedR = Math.max(0, Math.min(r, rows - 1));
    return clampedR * cols + clampedC;
}


// Food system //
const foodSpawned = [];

function appleSpawnContainer()
{
    const startingAmount = 500;
    return {
        x: Math.floor(Math.random() * 800) + 1,
        y: Math.floor(Math.random() * 600) + 1,
        size: 20,
        amount: startingAmount,
        amountMax: startingAmount
    };
}
function appleSpawn()
{
    foodSpawned.push(appleSpawnContainer());
}
const appleSpawnBtn = document.getElementById("appleSpawnBtn");
appleSpawnBtn.addEventListener("click", function ()
{
    appleSpawn();
    console.log("Apple Spawned!");
    console.log(foodSpawned);
});


// Ant Creation & Deletion Method //
// Our cute ant art:
const antImg = new Image();
antImg.src = 'img/ant.png';

const colony = [];
const corpses = [];
const homeStrength = 0.02;
const steerStrength = 0.05;
const gradientRange = 500;
const wanderRange = 400;
const wanderHomeStrength = 0.005;

function antCreationContainer()
{
    return {
        x: antNest.x,
        y: antNest.y,
        angle: Math.random() * (2 * Math.PI),
        size: 10,
        speed: 0.5,
        sensorDist: 20,
        sensorFOV: Math.PI / 4,
        hasFood: false,
        tripTicks: 0,
        wanderTicks: 0
    };
}

function antCreate()
{
    colony.push(antCreationContainer());
}

function antDelete()
{
    return colony.pop();
}

function antDeath(ant)
{
    if (!ant) return;
    corpses.push({ x: ant.x, y: ant.y, size: ant.size, life: 3 });
    console.log(`Ant died at (${ant.x}, ${ant.y})`);
}

// Create Ant Button
const addAntButton = document.getElementById("addAntBtn");
addAntButton.addEventListener("click", function ()
{
    antCreate();
    console.log("Ant Added! Ant Count: " + colony.length);
});

// Delete Ant Button
const deleteAntButton = document.getElementById("deleteAntBtn");
deleteAntButton.addEventListener("click", function ()
{
    const dead = antDelete();
    antDeath(dead);
    console.log("Ant Deleted! Ant Count: " + colony.length);
});

const addManyAntButton = document.getElementById("addManyAntBtn");
addManyAntButton.addEventListener("click", function ()
{
    for (let i = 0; i < 100; i++)
    {
        antCreate();
    }
    console.log("Ants Added! Ant Count: " + colony.length);
});

// Clear Ants Button — rewritten as a while loop so it doesn't skip ants
// while mutating the array mid-iteration (the old forEach version did)
const clearAntButton = document.getElementById("clearAntBtn");
clearAntButton.addEventListener("click", function ()
{
    while (colony.length > 0)
    {
        const dead = antDelete();
        antDeath(dead);
    }
    console.clear();
    console.log("Ants Cleared!");
});