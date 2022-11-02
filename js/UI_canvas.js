/*****************************************************************************
 * Canvas helpers
 *****************************************************************************/
function uiInitCanvas(canvas, width, height) {
    const pixelRation = 1.0;
    canvas.width  = width  * pixelRation;
    canvas.height = height * pixelRation;
    controlContext.scale(pixelRation, pixelRation);
}

