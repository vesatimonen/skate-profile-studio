/*****************************************************************************
 * Game window handling
 *****************************************************************************/
function windowResize() {
    if (gameBoardWidth != gameBoard.clientWidth) {
        gameBoardWidth = gameBoard.clientWidth;
        uiBoardSetup();
    }

    return false;
}


/*****************************************************************************
 * Window event handlers
 *****************************************************************************/
window.addEventListener("resize", windowResize);

