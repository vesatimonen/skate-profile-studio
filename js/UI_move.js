
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

    let rect = gameGrid.getBoundingClientRect();
    X -= rect.left;
    Y -= rect.top;
    X = X / gameGridCellSize;
    Y = Y / gameGridCellSize;

    return {X, Y};
}


/*****************************************************************************
 * Move event handlers
 *****************************************************************************/
var movePolarity = undefined;

function uiToggle(event, threshold) {
    move = uiMovePosition(event);
    X = move.X;
    Y = move.Y;

    /* Closest wall */
    Xwall = Math.round(X);
    Ywall = Math.round(Y);

    /* Current cell */
    Xcell = Math.floor(X);
    Ycell = Math.floor(Y);

    /* Check limits */
    if (Ycell < 0 || Ycell >= game.board.height ||
        Xcell < 0 || Xcell >= game.board.width) {
        return false;
    }

    /* Direction from wall */
    Xdelta = Math.abs(X - Xwall);
    Ydelta = Math.abs(Y - Ywall);
    if (Xdelta < Ydelta) {
        if (Ydelta - Xdelta > threshold) {
            /* Vertical wall */
            if (Xwall > 0 && Xwall < game.board.width) {
                movePolarity = game.makeMove("vertical", Xwall, Ycell, movePolarity);
                uiGameRefresh(game);
            }
        }
    } else {
        if (Xdelta - Ydelta > threshold) {
            /* Horizontal wall */
            if (Ywall > 0 && Ywall < game.board.height) {
                movePolarity = game.makeMove("horizontal", Xcell, Ywall, movePolarity);
                uiGameRefresh(game);
            }
        }
    }
}

var pinchZoom = false;
function uiMoveStart(event) {
    if (event.type == "touchstart" && event.touches.length > 1) {
        pinchZoom = true;
        return false;
    }

    uiToggle(event, 0.0);
    return false;
}

/* "paint mode" */
function uiMoveContinue(event) {
    if (pinchZoom) {
        return false;
    }

    if (movePolarity != undefined) {
        uiToggle(event, 0.3);
    }

    return false;
}

function uiMoveEnd(event) {
    if (pinchZoom) {
        pinchZoom = false;
    }

    /* Disable zoom */
    event.preventDefault();

    movePolarity = undefined;
    return false;
}

function uiMoveCancel() {
    movePolarity = undefined;
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



