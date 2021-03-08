let drawing = false;

console.log("drawing state: " + drawing);
function createCustomBoard() {
    let newDim = prompt("Select new board dimension (value must be under 100)", 16);
    
    if(isNaN(newDim))  {    
        alert("Please put valid input.");
    }
    
    if(newDim > 100) {
        alert("Are you trying to crash your browser? \nDimension set to max of 100.");
        newDim = 100;
    }
    emptyBoard();
    createBoard(newDim);
}

function resetCanvas() {
    let highlighted = document.getElementsByClassName("highlighted");
    console.log("Found: " + highlighted.length);
    for(let i = 0; i < highlighted.length;i++) {
        highlighted[i].classList.remove("highlighted");
        i--;
    }
}

function toggleColor(e) {
    if(e.target.matches('.tile')) {
        if (e.target.classList.contains("highlighted")) {
            return;
        }
        else {
            console.log(drawing);
            if(drawing === true) {
                e.target.classList.toggle("highlighted");  
            }
            else {
                e.target.classList.toggle("selected-tile")
                setTimeout(function() {
                    e.target.classList.toggle("selected-tile");
                }, 300);
            }
        } 

    }
}

function emptyBoard() {
    let container = document.querySelector("#container");
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function createBoard(dimension) {
    let container = document.querySelector("#container");

    let numRows = dimension;
    
    let tileWidth = Math.floor(container.offsetWidth / numRows);
    let tileHeight = Math.floor(container.offsetHeight / numRows);
    

    let newDiv = document.createElement("div");
    newDiv.classList.toggle('tile');
    newDiv.setAttribute("style", `min-width:${tileWidth}px; min-height:${tileHeight}px`)
    
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numRows; j++) {
            newDiv = newDiv.cloneNode(true);
            container.appendChild(newDiv);
        }
    }
    
    // click or mouseover up to you
    container.addEventListener('mouseover', toggleColor);
}

function toggleDrawing() {
    let drawing_state = document.querySelector("#drawing-state");
    if (drawing === false) {
        drawing = true;
        drawing_state.classList.remove("not-drawing");
        drawing_state.classList.add("currently-drawing");
        toggleColor(); // for some reason, on click will not draw tile until a new one is selected
    }
    else {
        drawing = false;
        drawing_state.classList.add("not-drawing");
        drawing_state.classList.remove("currently-drawing");
    }


console.log("drawing toggled: " + drawing);
}


createBoard(16);
window.addEventListener('click', toggleDrawing);

console.log("drawing state end: " + drawing);