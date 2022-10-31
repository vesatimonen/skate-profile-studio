const controlCanvas   = document.getElementById("control-canvas");
const controlContext = controlCanvas.getContext("2d");

function uiRedrawControls() {
    var canvas = document.getElementById('control-canvas');

    /* Clear canvas */
    controlContext.clearRect(0, 0, canvas.width, canvas.height);

    controlContext.moveTo(0, 0);
    controlContext.lineTo(controlCanvas.width, controlCanvas.height);
    controlContext.stroke();

    controlContext.beginPath();
    controlContext.arc(100, 100, 100, 0, 2 * Math.PI, false);
    controlContext.fillStyle = "#202020";
    controlContext.fill();
}

/*****************************************************************************
 * Initialize control canvas
 *****************************************************************************/
uiInitCanvas(controlCanvas, 401, 401);
uiRedrawControls();

