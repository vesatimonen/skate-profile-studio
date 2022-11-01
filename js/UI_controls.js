const controlCanvas  = document.getElementById("control-canvas");
const controlContext = controlCanvas.getContext("2d");

const controlCanvasWidth  = 480;
const controlCanvasHeight = 320;
const controlCanvasXMargin = 50;
const controlCanvasYMargin = 20;

const sliderCount = 7;
const sliderValueMin = 1.0;
const sliderValueMax = 10.0;
var   sliderValues = [];

const canvasXScale = (controlCanvasWidth - 2 * controlCanvasXMargin)  / (sliderCount - 1);
const canvasYScale = (controlCanvasHeight - 2 * controlCanvasYMargin) / (sliderValueMax - sliderValueMin);


/*****************************************************************************
 * Conversion functions
 *****************************************************************************/
function convertSliderToX(slider) {
    return Math.floor(controlCanvasXMargin + slider * canvasXScale) + 0.5;
}

function convertValueToY(value) {
    return Math.floor(controlCanvasHeight - controlCanvasYMargin - (value - sliderValueMin) * canvasYScale) + 0.5;
}

function convertYToValue(y) {
    value = sliderValueMin + (controlCanvasHeight - controlCanvasYMargin - y) / canvasYScale;

    if (value > 5.0) {
        value = Math.round(value * 2.0) / 2.0;
    } else {
        value = Math.round(value * 10.0) / 10.0;
    }

    if (value < sliderValueMin) {
        return sliderValueMin;
    }
    if (value > sliderValueMax) {
        return sliderValueMax;
    }
    return value;
}


/*****************************************************************************
 * Redraw control canvas
 *****************************************************************************/
function uiRedrawControls() {
    var sliderPositions = [];

    /* Clear canvas */
    controlContext.clearRect(0, 0, controlCanvas.width, controlCanvas.height);

    /* Calculate slider positions */
    for (let slider = 0; slider < sliderCount; slider++) {
        sliderPositions[slider] = {
            x: convertSliderToX(slider),
            y: convertValueToY(sliderValues[slider]) };
    }

    /* Draw slider tracks and ticks */
    controlContext.beginPath();
    for (let slider = 0; slider < sliderCount; slider++) {
        controlContext.moveTo(sliderPositions[slider].x, convertValueToY(sliderValueMin));
        controlContext.lineTo(sliderPositions[slider].x, convertValueToY(sliderValueMax));
    }

    var yDelta = 0.5;
    var tickLen = 5;
    for (let y = sliderValueMin; y <= sliderValueMax; y += yDelta) {
        if (y == Math.floor(y)) {
            controlContext.font         = "12px monospace";
            controlContext.textBaseline = "middle";
            controlContext.textAlign    = "center";
            controlContext.fillStyle    = "#303030";
            controlContext.fillText(y.toFixed(1) + "m", sliderPositions[sliderCount - 1].x + 30, convertValueToY(y));
            controlContext.fillText(y.toFixed(1) + "m", sliderPositions[0].x - 30, convertValueToY(y));
            tickLen = 4;
        } else {
            tickLen = 2;
        }
        for (let slider = 0; slider < sliderCount; slider++) {
            controlContext.moveTo(sliderPositions[slider].x - tickLen, convertValueToY(y));
            controlContext.lineTo(sliderPositions[slider].x + tickLen, convertValueToY(y));
        }
    }
    controlContext.lineWidth = 1.0;
    controlContext.lineCap = "round";
    controlContext.strokeStyle = "#303030";
    controlContext.stroke();

    /* Draw lines between controls */
    controlContext.beginPath();
    for (let slider = 0; slider < sliderCount; slider++) {
        if (slider == 0) {
            controlContext.moveTo(sliderPositions[slider].x, sliderPositions[slider].y);
        } else {
            controlContext.lineTo(sliderPositions[slider].x, sliderPositions[slider].y);
        }
    }
    controlContext.lineWidth = 3;
    controlContext.strokeStyle = "#0000ff";
    controlContext.stroke();

    /* Draw slider controls */
    for (let slider = 0; slider < sliderCount; slider++) {
        /* Draw slider position */
        controlContext.beginPath();
        controlContext.arc(sliderPositions[slider].x, sliderPositions[slider].y, 8, 0, 2 * Math.PI, false);
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
    for (let slider = 0; slider < sliderCount; slider++) {
        sliderX = convertSliderToX(slider);
        sliderY = convertValueToY(sliderValues[slider]);

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
        sliderValues[sliderToMove] = convertYToValue(position.y);
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

    for (let slider = 0; slider < sliderCount; slider++) {
        sliderValues[slider] = sliderValueMin;
sliderValues[slider] = sliderValueMin + slider / (sliderCount - 1) * (sliderValueMax - sliderValueMin);
    }

    /* Redraw controls */
    uiRedrawControls();
}

uiInitControls();




//document.getElementById("debug-text").innerHTML = window.innerWidth;

