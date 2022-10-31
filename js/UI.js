/*****************************************************************************
 * Canvas helpers
 *****************************************************************************/
function uiInitCanvas(canvas, width, height) {
    const pixelRation = 1.0;
    canvas.width  = width  * pixelRation;
    canvas.height = height * pixelRation;
    controlContext.scale(pixelRation, pixelRation);
}

/*****************************************************************************
 * Canvas helpers
 *****************************************************************************/
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

uiInitCanvas(controlCanvas, 401, 401);
uiRedrawControls();

//document.getElementById("debug-text").innerHTML = window.innerWidth;

