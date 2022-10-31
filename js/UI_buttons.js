
/*****************************************************************************
 * Button handlers
 *****************************************************************************/
function uiUndo(event) {
    return false;
}

function uiRestart(event) {
    return false;
}

/*****************************************************************************
 * Register button event handlers
 *****************************************************************************/
document.getElementById("button-undo").addEventListener("click",    uiUndo);
document.getElementById("button-restart").addEventListener("click", uiRestart);

