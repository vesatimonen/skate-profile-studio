const controlCanvas   = document.getElementById("control-canvas");
const controlContext = controlCanvas.getContext("2d");

const controlCanvasWidth  = 401;
const controlCanvasHeight = 401;
const controlCanvasMargin = 20;

const controlSliderCount = 7;

const controlSliderValueMin = 1.0;
const controlSliderValueMax = 10.0;
var   controlSliderValues = [];


/*****************************************************************************
 * Redraw control canvas
 *****************************************************************************/
function uiRedrawControls() {
    var canvas = document.getElementById('control-canvas');

    /* Clear canvas */
    controlContext.clearRect(0, 0, canvas.width, canvas.height);

    xScale = (controlCanvasWidth - 2 * controlCanvasMargin)  / (controlSliderCount - 1);
    yScale = (controlCanvasHeight - 2 * controlCanvasMargin) / (controlSliderValueMax - controlSliderValueMin);

    /* Draw lines between controls */
    controlContext.beginPath();
    for (let slider = 0; slider < controlSliderCount; slider++) {
        /* Slider position */
        x = controlCanvasMargin + slider * xScale;
        y = controlCanvasHeight - controlCanvasMargin - controlSliderValues[slider] * yScale;

        if (slider == 0) {
            controlContext.moveTo(x, y);
        } else {
            controlContext.lineTo(x, y);
        }
    }
    controlContext.lineWidth = 3;
    controlContext.strokeStyle = "#0000ff";
    controlContext.stroke();

    /* Draw slider controls */
    for (let slider = 0; slider < controlSliderCount; slider++) {
        /* Slider position */
        x = controlCanvasMargin + slider * xScale;
        y = controlCanvasHeight - controlCanvasMargin - controlSliderValues[slider] * yScale;

        /* Draw slider position */
        controlContext.beginPath();
        controlContext.arc(x, y, 8, 0, 2 * Math.PI, false);
        controlContext.fillStyle = "#ffffff";
        controlContext.fill();

        controlContext.lineWidth = 3;
        controlContext.strokeStyle = "#0000ff";
        controlContext.stroke();
    }
}



/*****************************************************************************
 * Initialize control canvas
 *****************************************************************************/
function uiInitControls() {
    /* Initialize canvas area */
    uiInitCanvas(controlCanvas, controlCanvasWidth, controlCanvasHeight);

    for (let slider = 0; slider < controlSliderCount; slider++) {
        controlSliderValues[slider] = controlSliderValueMin;
controlSliderValues[slider] = controlSliderValueMin + slider / controlSliderCount * (controlSliderValueMax - controlSliderValueMin);
    }

    /* Redraw controls */
    uiRedrawControls();
}

uiInitControls();

