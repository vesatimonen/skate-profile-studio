const buttonRestart  = document.getElementById("button-restart");
const buttonUndo     = document.getElementById("button-undo");


/*****************************************************************************
 * Button handlers
 *****************************************************************************/
function uiUndo(event) {
    /* Make undo if possible */
    if (game.undoMove() == false) {
        return false;
    }

    /* Refresh board */
    uiGameRefresh(game);

    return false;
}

function uiRestart(event) {
    /* Undo all moves back */
    while (true) {
        if (game.undoMove() == false) {
            break;
        }
    }

    /* Setup board and refresh UI */
    uiBoardSetup(game.board);

    return false;
}

var restartTimer;
function uiMouseUp(event) {
    clearInterval(restartTimer);
    return false;
}

function uiMouseDown(event) {
    restartTimer = setInterval(
                        function() {
                            if (game.level == 0) {
                                clearInterval(restartTimer);
                            } else {
                                levelStart(game.level - 1);
                            }
                        },
                        500);
    return false;
}



/*****************************************************************************
 * Register button event handlers
 *****************************************************************************/
/* UNDO */
buttonUndo.addEventListener("click", uiUndo);

/* RESTART */
buttonRestart.addEventListener("click",      uiRestart);
buttonRestart.addEventListener("mouseup",    uiMouseUp);
buttonRestart.addEventListener("mouseleave", uiMouseUp);
buttonRestart.addEventListener("mousedown",  uiMouseDown);
buttonRestart.addEventListener("touchend",   uiMouseUp);
buttonRestart.addEventListener("touchstart", uiMouseDown, {passive: true});

function preventZoom(event) {
    /* Disable double click zoom */
    event.preventDefault();
}

document.getElementById("game-screen").addEventListener("click", preventZoom);

