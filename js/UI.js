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

const controlCanvas   = document.getElementById("control-canvas");
const controlContext = controlCanvas.getContext("2d");

function uiElementsRedraw() {
    var canvas = document.getElementById('control-canvas');

    /* Clear canvas */
    controlContext.clearRect(0, 0, canvas.width, canvas.height);

document.getElementById("debug-text").innerHTML = controlCanvas.width + " / " + controlCanvas.height;

    controlContext.moveTo(0, 0);
    controlContext.lineTo(controlCanvas.width, controlCanvas.height);
    controlContext.stroke();

    controlContext.beginPath();
    controlContext.arc(100, 100, 100, 0, 2 * Math.PI, false);
    controlContext.fillStyle = "#202020";
    controlContext.fill();
}



function initCanvas(canvas, width, height) {
    const pixelRation = 1.0;
    canvas.width  = width  * pixelRation;
    canvas.height = height * pixelRation;
    controlContext.scale(pixelRation, pixelRation);
}

initCanvas(controlCanvas, 401, 401);


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

