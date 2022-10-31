const controlCanvas   = document.getElementById("control-canvas");
const controlContext = controlCanvas.getContext("2d");

const controlCanvasWidth  = 401;
const controlCanvasHeight = 401;
const controlCanvasMargin = 20;

const controlSliderCount = 7;

const controlSliderValueMin = 1.0;
const controlSliderValueMax = 10.0;
var   controlSliderValues = [];
var   controlSliderPositions = [];


/*****************************************************************************
 * Redraw control canvas
 *****************************************************************************/
function uiRedrawControls() {
    var canvas = document.getElementById('control-canvas');

    /* Clear canvas */
    controlContext.clearRect(0, 0, canvas.width, canvas.height);

    xScale = (controlCanvasWidth - 2 * controlCanvasMargin)  / (controlSliderCount - 1);
    yScale = (controlCanvasHeight - 2 * controlCanvasMargin) / (controlSliderValueMax - controlSliderValueMin);

    /* Calculate slider positions */
    for (let slider = 0; slider < controlSliderCount; slider++) {
        controlSliderPositions[slider] = {
            x: controlCanvasMargin + slider * xScale,
            y: controlCanvasHeight - controlCanvasMargin - (controlSliderValues[slider] - controlSliderValueMin) * yScale};
    }

    /* Draw lines between controls */
    controlContext.beginPath();
    for (let slider = 0; slider < controlSliderCount; slider++) {
        if (slider == 0) {
            controlContext.moveTo(controlSliderPositions[slider].x, controlSliderPositions[slider].y);
        } else {
            controlContext.lineTo(controlSliderPositions[slider].x, controlSliderPositions[slider].y);
        }
    }
    controlContext.lineWidth = 3;
    controlContext.strokeStyle = "#0000ff";
    controlContext.stroke();

    /* Draw slider controls */
    for (let slider = 0; slider < controlSliderCount; slider++) {
        /* Draw slider position */
        controlContext.beginPath();
        controlContext.arc(controlSliderPositions[slider].x, controlSliderPositions[slider].y, 8, 0, 2 * Math.PI, false);
        controlContext.fillStyle = "#ffffff";
        controlContext.fill();

        controlContext.lineWidth = 3;
        controlContext.strokeStyle = "#0000ff";
        controlContext.stroke();
    }
}



/*****************************************************************************
 * Control canvas events
 *****************************************************************************/

function uiControlPosition(event) {
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

    let rect = controlCanvas.getBoundingClientRect();
    X -= rect.left;
    Y -= rect.top;

/*
    X = X / GridCellSize;
    Y = Y / GridCellSize;
*/

    return {X, Y};
}


function uiControlStart(event) {
    console.log(uiControlPosition(event));
uiRedrawControls();
controlSliderValues[0] += 0.1;
    return false;
}

function uiControlContinue(event) {
    return false;
}

function uiControlEnd(event) {
    return false;
}


controlCanvas.addEventListener("mousedown",  uiControlStart);
controlCanvas.addEventListener("mousemove",  uiControlContinue);
controlCanvas.addEventListener("mouseup",    uiControlEnd);
controlCanvas.addEventListener("mouseleave", uiControlEnd);

controlCanvas.addEventListener("touchstart", uiControlStart, {passive: true});
controlCanvas.addEventListener("touchmove",  uiControlContinue, {passive: true});
controlCanvas.addEventListener("touchend",   uiControlEnd);




/*****************************************************************************
 * Initialize control canvas
 *****************************************************************************/
function uiInitControls() {
    /* Initialize canvas area */
    uiInitCanvas(controlCanvas, controlCanvasWidth, controlCanvasHeight);

    for (let slider = 0; slider < controlSliderCount; slider++) {
        controlSliderValues[slider] = controlSliderValueMin;
controlSliderValues[slider] = controlSliderValueMin + slider / (controlSliderCount - 1) * (controlSliderValueMax - controlSliderValueMin);
    }

    /* Redraw controls */
    uiRedrawControls();
}

uiInitControls();




//document.getElementById("debug-text").innerHTML = window.innerWidth;

