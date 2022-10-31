/*****************************************************************************
 * UI elements
 *****************************************************************************/
const appScreen = document.getElementById("app-screen");
const gameBoard = document.getElementById("game-board");

/*****************************************************************************
 * Board size variables
 *****************************************************************************/
var gameBoardWidth;

/*****************************************************************************
 * Redraw buttons
 *****************************************************************************/


function uiElementsRedraw() {
    var canvas = document.getElementById('game-canvas');
    var context = canvas.getContext('2d');

    /* Set canvas size and clear it */
    canvas.width = gameBoard.clientWidth;
    canvas.height = gameBoard.clientHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);

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

