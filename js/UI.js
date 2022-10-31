/*****************************************************************************
 * UI elements
 *****************************************************************************/
const gameScreen = document.getElementById("game-screen");
const gameBoard = document.getElementById("game-board");
const gameGrid  = document.getElementById("game-grid");

/*****************************************************************************
 * Board size variables
 *****************************************************************************/
var gameGridWidth;
var gameGridCellSize;

/*****************************************************************************
 * Redraw buttons
 *****************************************************************************/
function uiButtonsRedraw(game) {
    if (game.moveHistory.length == 0) {
        buttonUndo.disabled = true;
    } else {
        buttonUndo.disabled = false;
    }

    if (game.level == 0 && game.moveHistory.length == 0) {
        buttonRestart.disabled = true;
    } else {
        buttonRestart.disabled = false;
    }
}

/*****************************************************************************
 * Redraw level elements
 *****************************************************************************/
function uiInfoRedraw(game) {
    let gameInfo = document.getElementById("game-info");
    gameInfo.innerHTML = "L" + (game.level + 1);
}

/*****************************************************************************
 * Redraw cell
 *****************************************************************************/
function uiCellRedraw(board, x, y) {
    /* Get DOM element for counter */
    let cell = document.getElementById("cell-" + x + "-" + y);

    /* Set value on board */
    cell.innerHTML = board.values[x][y];

    /* Set background */
    if (board.resolved(x, y)) {
        cell.style.background = "#67BFEC";
    } else {
        cell.style.background = "none";
    }

}


function uiElementsRedraw(board) {
    var canvas = document.getElementById('game-canvas');
    var context = canvas.getContext('2d');

    /* Set canvas size and clear it */
    canvas.width = gameGrid.clientWidth;
    canvas.height = gameGrid.clientHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);

    /* Draw dots */
    var dotRadius = 3;
    for (y = 0; y <= board.height; y++) {
        for (x = 0; x <= board.width; x++) {
            context.beginPath();
            context.arc(gameGridCellSize * x, gameGridCellSize * y, dotRadius, 0, 2 * Math.PI, false);
            context.fillStyle = "#202020";
            context.fill();
        }
    }

    /* Draw walls */
    var lineWidth = 3;
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = "#202020";

    /* Draw vertical walls */
    for (let x = 0; x < board.width + 1; x++) {
        for (let y = 0; y < board.height; y++) {
            if (board.getVerticalWall(x, y) > 0) {
                context.moveTo(gameGridCellSize * x, gameGridCellSize * y);
                context.lineTo(gameGridCellSize * x, gameGridCellSize * (y + 1));
            }
        }
    }

    /* Draw horizontal walls */
    for (let y = 0; y < board.height + 1; y++) {
        for (let x = 0; x < board.width; x++) {
            if (board.getHorizontalWall(x, y) > 0) {
                context.moveTo(gameGridCellSize * x, gameGridCellSize * y);
                context.lineTo(gameGridCellSize * (x + 1), gameGridCellSize * y);
            }
        }
    }

    context.stroke();
}

function uiBoardRedraw(board) {
    /* Redraw cell content */
    for (y = 0; y < board.height; y++) {
        for (x = 0; x < board.width; x++) {
            /* Redraw item image */
            uiCellRedraw(board, x ,y);
        }
    }

    /* Redraw dots and walls */
    uiElementsRedraw(board);

    /* Redraw info */
    uiInfoRedraw(game);

    /* Redraw buttons */
    uiButtonsRedraw(game);
}


/*****************************************************************************
 * Setup board elements
 *****************************************************************************/
function uiBoardSetup(board) {

    /* Get board current size (for resizing) */
    gameGridWidth = gameGrid.clientWidth;

    /* Calculate board grid size */
    gameGridCellSize = Math.floor((gameScreen.clientWidth) / 9); /* 9 = Maximum board X-size */

    /* Clear elements in board */
    while (gameGrid.firstChild) {
        gameGrid.removeChild(gameGrid.firstChild);
    }

    /* Center the board */
    gameBoard.style.width = gameGridCellSize * board.width + "px";
    gameBoard.style.left  = Math.floor((gameGridCellSize * (9 - board.width)) / 2) + "px";

    /* Create grid and add cells */
    for (y = 0; y < board.height; y++) {
        /* Create row */
        let newRow = document.createElement("div");
        newRow.className = "grid-row";
        gameGrid.appendChild(newRow);

        for (x = 0; x < board.width; x++) {
            /* Create cell */
            let newCell = document.createElement("div");
            newCell.className    = "grid-cell";
            newCell.id           = "cell-" + x + "-" + y;

            newCell.style.width      = gameGridCellSize + "px";
            newCell.style.height     = gameGridCellSize + "px";
            newCell.style.lineHeight = gameGridCellSize + "px"; /* Center text vertically */
            newCell.style.textAlign  = "center";

            newRow.appendChild(newCell);

        }
    }

    /* Redraw board */
    uiBoardRedraw(board);
}

/*****************************************************************************
 * Refresh board elements and check if game over
 *****************************************************************************/
function uiGridAnimationEnd(event) {
    event.stopPropagation();
    levelStart(game.level + 1); /* Start new level */
    return false;
}

function uiGameRefresh(game) {
    /* Redraw game board */
    uiBoardRedraw(game.board);

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

