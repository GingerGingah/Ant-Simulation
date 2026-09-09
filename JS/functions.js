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