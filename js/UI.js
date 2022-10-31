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

function uiBoardRedraw() {
    /* Redraw dots and walls */
    uiElementsRedraw();
}


/*****************************************************************************
 * Setup board elements
 *****************************************************************************/
function uiBoardSetup() {
    /* Get board current size (for resizing) */
    gameBoardWidth = gameBoard.clientWidth;

    /* Redraw board */
    uiBoardRedraw();
}

/*****************************************************************************
 * Refresh board elements and check if game over
 *****************************************************************************/
function uiGridAnimationEnd(event) {
    event.stopPropagation();
    return false;
}

function uiGameRefresh(game) {
    /* Redraw game board */
    uiBoardRedraw();

    /* Check if end of level */
    if (game.board.solved()) {
        /* Start animation */
        gameBoard.addEventListener("animationend", uiGridAnimationEnd);
        gameBoard.style.animation = "none";
        gameBoard.offsetHeight; /* trigger reflow */
        gameBoard.style.animation = "image-appear 0.5s ease-in 0.2s 1 reverse";
    }
}


//document.getElementById("debug-text").innerHTML = window.innerWidth;

