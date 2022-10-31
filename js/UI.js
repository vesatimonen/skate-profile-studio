/*****************************************************************************
 * UI elements
 *****************************************************************************/
const appScreen = document.getElementById("app-screen");
const gameBoard = document.getElementById("control-canvas");

/*****************************************************************************
 * Board size variables
 *****************************************************************************/
var gameBoardWidth;

/*****************************************************************************
 * Redraw buttons
 *****************************************************************************/


function uiElementsRedraw() {
    var canvas = document.getElementById('control-canvas');
    var context = canvas.getContext('2d');

    /* Set canvas size and clear it */
//    canvas.width = gameBoard.clientWidth;
//    canvas.height = gameBoard.clientHeight;
//    context.clearRect(0, 0, canvas.width, canvas.height);

//canvas.width = 200;
//canvas.height = 200;

document.getElementById("debug-text").innerHTML = canvas.width + " / " + canvas.height;


    context.moveTo(0, 0);
    context.lineTo(canvas.width, canvas.height);
    context.stroke();

    context.beginPath();
    context.arc(100, 100, 100, 0, 2 * Math.PI, false);
    context.fillStyle = "#202020";
    context.fill();
}



/*****************************************************************************
 * Setup board elements
 *****************************************************************************/
function uiBoardSetup() {
    /* Get board current size (for resizing) */
    gameBoardWidth = gameBoard.clientWidth;

    /* Redraw window */
    uiElementsRedraw();
}

/* Setup board */
uiBoardSetup();

//document.getElementById("debug-text").innerHTML = window.innerWidth;

