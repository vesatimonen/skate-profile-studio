
/*****************************************************************************
 * Move helpers
 *****************************************************************************/
function uiMovePosition(event) {
    let X, Y;

    switch (event.type) {
        case "mousedown":
        case "mousemove":
        case "mouseup":
        case "mouseleave":
            X = event.clientX;
            Y = event.clientY;
            break;
        case "touchstart":
        case "touchmove":
        case "touchend":
        case "touchcancel":
            /* Ignore if touched multiple fingers */
            if (event.targetTouches > 1) {
                return undefined;
            }

            X = event.touches[0].clientX;
            Y = event.touches[0].clientY;
            break;
        default:
            return undefined;
    }

/*
    let rect = gameGrid.getBoundingClientRect();
    X -= rect.left;
    Y -= rect.top;
    X = X / gameGridCellSize;
    Y = Y / gameGridCellSize;
*/

    return {X, Y};
}


/*****************************************************************************
 * Move event handlers
 *****************************************************************************/
function uiMoveStart(event) {
    return false;
}

/* "paint mode" */
function uiMoveContinue(event) {
    return false;
}

function uiMoveEnd(event) {
    return false;
}

function uiMoveCancel() {
    return false;
}


/*****************************************************************************
 * Register mouse event handlers
 *****************************************************************************/
gameBoard.addEventListener("mousedown",  uiMoveStart);
gameBoard.addEventListener("mousemove",  uiMoveContinue);
gameBoard.addEventListener("mouseup",    uiMoveEnd);
gameBoard.addEventListener("mouseleave", uiMoveCancel);

/*****************************************************************************
 * Register touch event handlers
 *****************************************************************************/
gameBoard.addEventListener("touchstart", uiMoveStart, {passive: true});
gameBoard.addEventListener("touchmove",  uiMoveContinue, {passive: true});
gameBoard.addEventListener("touchend",   uiMoveEnd);



