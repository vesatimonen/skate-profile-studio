const controlCanvas  = document.getElementById("control-canvas");
const controlContext = controlCanvas.getContext("2d");

const controlCanvasWidth  = 480;
const controlCanvasHeight = 320;
const controlCanvasXMargin = 50;
const controlCanvasYMargin = 20;

const controlSliderCount = 7;

const controlSliderValueMin = 1.0;
const controlSliderValueMax = 10.0;
var   controlSliderValues = [];
var   controlSliderPositions = [];


const canvasXScale = (controlCanvasWidth - 2 * controlCanvasXMargin)  / (controlSliderCount - 1);
const canvasYScale = (controlCanvasHeight - 2 * controlCanvasYMargin) / (controlSliderValueMax - controlSliderValueMin);

function convertSliderToX(slider) {
    return Math.floor(controlCanvasXMargin + slider * canvasXScale) + 0.5;
}

function convertValueToY(value) {
    return Math.floor(controlCanvasHeight - controlCanvasYMargin - (value - controlSliderValueMin) * canvasYScale) + 0.5;
}

function convertYToValue(y) {
    value = controlSliderValueMin + (controlCanvasHeight - controlCanvasYMargin - y) / canvasYScale;
    if (value < controlSliderValueMin) {
        return controlSliderValueMin;
    }
    if (value > controlSliderValueMax) {
        return controlSliderValueMax;
    }
    return value;
}

/*****************************************************************************
 * Redraw control canvas
 *****************************************************************************/
function uiRedrawControls() {
    var canvas = document.getElementById('control-canvas');

    /* Clear canvas */
    controlContext.clearRect(0, 0, canvas.width, canvas.height);

    /* Calculate slider positions */
    for (let slider = 0; slider < controlSliderCount; slider++) {
        controlSliderPositions[slider] = {
            x: convertSliderToX(slider),
            y: convertValueToY(controlSliderValues[slider]) };
    }

    /* Draw slider tracks and ticks */
    controlContext.beginPath();
    for (let slider = 0; slider < controlSliderCount; slider++) {
        controlContext.moveTo(controlSliderPositions[slider].x, convertValueToY(controlSliderValueMin));
        controlContext.lineTo(controlSliderPositions[slider].x, convertValueToY(controlSliderValueMax));
    }

    var yDelta = 0.5;
    var tickLen = 5;
    for (let y = controlSliderValueMin; y <= controlSliderValueMax; y += yDelta) {
        if (y == Math.floor(y)) {
            controlContext.font         = "12px monospace";
            controlContext.textBaseline = "middle";
            controlContext.textAlign    = "center";
            controlContext.fillStyle    = "#303030";
            controlContext.fillText(y.toFixed(1) + "m", controlSliderPositions[controlSliderCount - 1].x + 30, convertValueToY(y));
            controlContext.fillText(y.toFixed(1) + "m", controlSliderPositions[0].x - 30, convertValueToY(y));
            tickLen = 4;
        } else {
            tickLen = 2;
        }
        for (let slider = 0; slider < controlSliderCount; slider++) {
            controlContext.moveTo(controlSliderPositions[slider].x - tickLen, convertValueToY(y));
            controlContext.lineTo(controlSliderPositions[slider].x + tickLen, convertValueToY(y));
        }
    }
    controlContext.lineWidth = 1.0;
    controlContext.lineCap = "round";
    controlContext.strokeStyle = "#303030";
    controlContext.stroke();

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
    let x, y;

    switch (event.type) {
        case "mousedown":
        case "mousemove":
        case "mouseup":
        case "mouseleave":
            x = event.clientX;
            y = event.clientY;
            break;
        case "touchstart":
        case "touchmove":
        case "touchend":
        case "touchcancel":
            /* Ignore if touched multiple fingers */
            if (event.targetTouches > 1) {
                return undefined;
            }

            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
            break;
        default:
            return undefined;
    }

    let rect = controlCanvas.getBoundingClientRect();
    x -= rect.left;
    y -= rect.top;

    return {x, y};
}

var sliderToMove = undefined;

function uiControlStart(event) {
    position = uiControlPosition(event);

    /* Find out if slider selected */
    for (let slider = 0; slider < controlSliderCount; slider++) {
        sliderX = convertSliderToX(slider);
        sliderY = convertValueToY(controlSliderValues[slider]);

        if (Math.abs(sliderX - position.x) + Math.abs(sliderY - position.y) < 20) {
            sliderToMove = slider;
        }
    }

    return false;
}

function uiControlContinue(event) {

    if (sliderToMove != undefined) {
        position = uiControlPosition(event);

        document.getElementById("debug-text").innerHTML = sliderToMove;
        controlSliderValues[sliderToMove] = convertYToValue(position.y);
        uiRedrawControls();
    }

    return false;
}

function uiControlEnd(event) {
    if (sliderToMove != undefined) {
        sliderToMove = undefined;
        uiRedrawControls();
    }

    return false;
}


window.addEventListener("mousedown",  uiControlStart);
window.addEventListener("mousemove",  uiControlContinue);
window.addEventListener("mouseup",    uiControlEnd);
window.addEventListener("mouseleave", uiControlEnd);

window.addEventListener("touchstart", uiControlStart, {passive: true});
window.addEventListener("touchmove",  uiControlContinue, {passive: true});
window.addEventListener("touchend",   uiControlEnd);




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

