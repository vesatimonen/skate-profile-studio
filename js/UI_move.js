
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
    let rect = .getBoundingClientRect();
    X -= rect.left;
    Y -= rect.top;
    X = X / GridCellSize;
    Y = Y / GridCellSize;
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
window.addEventListener("mousedown",  uiMoveStart);
window.addEventListener("mousemove",  uiMoveContinue);
window.addEventListener("mouseup",    uiMoveEnd);
window.addEventListener("mouseleave", uiMoveCancel);

/*****************************************************************************
 * Register touch event handlers
 *****************************************************************************/
window.addEventListener("touchstart", uiMoveStart, {passive: true});
window.addEventListener("touchmove",  uiMoveContinue, {passive: true});
window.addEventListener("touchend",   uiMoveEnd);



