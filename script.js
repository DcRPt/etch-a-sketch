const addColorButtons = document.querySelectorAll('.featurebutton');
const userColorPicker = document.querySelector('#input-color');
let slider = document.querySelector('#sizeRange');
let color = 'black';

function newGrid(numberCells) {
    numberCells = numberCells || 16;
    let cellWidth = 40/numberCells + "rem";
    let cellHeight = 40/numberCells + "rem";
    const mainContainerDiv = document.getElementById("maincontainer");
    let divArray = [];
    for (i = 0; i < numberCells; i++) {
        divArray[i] = document.createElement("div");
        mainContainerDiv.appendChild(divArray[i]);
        for (j = 0; j < numberCells; j++) {
            const newDiv = document.createElement("div");
            const classAttribute = document.createAttribute("class");
            classAttribute.value = "gamecell";
            newDiv.setAttributeNode(classAttribute);
            const widthHeightAttribute = document.createAttribute("style")
            widthHeightAttribute.value = `width: ${cellWidth}; height: ${cellHeight};`;
            newDiv.setAttributeNode(widthHeightAttribute);
            divArray[i].appendChild(newDiv);
        }
    }
    onLoad();
}

function reSizeGrid() {
    let allCells = document.querySelectorAll(".gamecell").forEach(cell => {
        cell.style.backgroundColor = "white";
    })
    let promptNumberCells = prompt("How many squares per row?");
    let numberCells = parseInt(promptNumberCells, 10);
    if (isNaN(numberCells)) {
        window.alert("You must enter a number between 1 and 100");
        return;
    }
    else if (numberCells <= 0) {
        window.alert("You must enter a number between 1 and 100");
        return;
    }
    else if (numberCells > 100) {
        window.alert("You must enter a number between 1 and 100");
        return;
    }
    const mainContainerDiv = document.getElementById("maincontainer");
    while (mainContainerDiv.firstChild) mainContainerDiv.removeChild( mainContainerDiv.firstChild);
    newGrid(numberCells);
}

window.addEventListener('DOMContentLoaded', (event) => {
    newGrid();
});

function colorGrid() {
    console.log("triggers colorGrid")
    switch (color) {
        case 'rainbow':
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            break;
        case 'eraser':
            this.style.backgroundColor = '#ffffff';
            break;
        case 'black':
            this.style.backgroundColor = '#000000';
            break;
        default:
            this.style.backgroundColor = color;
            break;
    } 
}

function changeColor(event) {
    console.log("triggers changeColor")
    switch (event.target.dataset.color) { 
        case 'rainbow':
            color = 'rainbow';
            break;  
        case 'eraser':
            color = 'eraser';
            break;
        default:
            color = 'black';
            break;
    } 
}

function buttonHover() {
    this.style.border = '3px solid white';
}

function buttonStandard() {
    this.style.border = '3px solid black';
}

function userColorSelection(event) {
    color = event.target.value;
}

addColorButtons.forEach(addColorButton => addColorButton.addEventListener('click', changeColor));
addColorButtons.forEach(addColorButton => addColorButton.addEventListener('mouseover', buttonHover));
addColorButtons.forEach(addColorButton => addColorButton.addEventListener('mouseout', buttonStandard));
userColorPicker.addEventListener('change', userColorSelection, false);
userColorPicker.addEventListener('input', userColorSelection, false);
slider.addEventListener('mouseup', pixelSize);

function onLoad() {
    let gridPixels = document.querySelectorAll(".gamecell");
    gridPixels.forEach(gridPixel => gridPixel.addEventListener("mouseover", colorGrid));
}
