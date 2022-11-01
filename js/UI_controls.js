/* Control canvas definitions */
const controlCanvas  = document.getElementById("control-canvas");
const controlContext = controlCanvas.getContext("2d");
const controlCanvasWidth  = 540;
const controlCanvasHeight = 360;
const controlCanvasMargin = {left: 50, right: 50, top: 20, bottom: 60};

/* Slider configurations */
const sliderCount = 7;
const sliderDistance = 50; /* mm */
const sliderValueMin = 1.0;
const sliderValueMax = 10.0;
var   sliderValues = [];

const skateBlades = [
    {size: 221, length: 65},
    {size: 230, length: 70},
    {size: 238, length: 75},
    {size: 245, length: 80},
    {size: 254, length: 85},
    {size: 263, length: 90},
    {size: 272, length: 95},
    {size: 280, length: 100},
    {size: 288, length: 105},
    {size: 296, length: 110},
    {size: 306, length: 115},
];


/*****************************************************************************
 * Scaling conversion functions
 *****************************************************************************/
const canvasXScale = (controlCanvasWidth - (controlCanvasMargin.left + controlCanvasMargin.right))  / (sliderCount - 1);
const canvasYScale = (controlCanvasHeight - (controlCanvasMargin.top + controlCanvasMargin.bottom)) / (sliderValueMax - sliderValueMin);

function convertSliderToX(slider) {
    return Math.floor(controlCanvasMargin.left + slider * canvasXScale) + 0.5;
}

function convertValueToX(value) {
    xPixels = controlCanvasWidth - (controlCanvasMargin.left + controlCanvasMargin.right);
    xLength = (sliderCount - 1) * sliderDistance;
    xScale  = xPixels / xLength;

    return Math.floor(controlCanvasMargin.left + xPixels / 2 + value * xScale) + 0.5;
}

function convertValueToY(value) {
    return Math.floor(controlCanvasHeight - controlCanvasMargin.bottom - (value - sliderValueMin) * canvasYScale) + 0.5;
}

function convertYToValue(y) {
    value = sliderValueMin + (controlCanvasHeight - controlCanvasMargin.bottom - y) / canvasYScale;

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

    /* Draw slider tracks */
    controlContext.beginPath();
    for (let slider = 0; slider < sliderCount; slider++) {
        controlContext.moveTo(sliderPositions[slider].x, convertValueToY(sliderValueMin));
        controlContext.lineTo(sliderPositions[slider].x, convertValueToY(sliderValueMax));
    }

    /* Draw slider ticks and legends */
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

    /* Draw X legend */
    var baselineY = 25 + Math.floor(controlCanvasHeight - controlCanvasMargin.bottom) + 0.5;
    controlContext.beginPath();
    controlContext.moveTo( convertValueToX(-((sliderCount - 1) / 2 - 1) * sliderDistance), baselineY);
    controlContext.lineTo( convertValueToX( ((sliderCount - 1) / 2 - 1) * sliderDistance), baselineY);

    for (let xValue = -((sliderCount - 1) / 2 - 1) * sliderDistance; xValue <= ((sliderCount - 1) / 2 - 1) * sliderDistance; xValue += 5) {
        if (xValue == 0) {
            tickLen = 8;
        } else {
            if (xValue % 10 == 0) {
                tickLen = 4;
            } else {
                tickLen = 2;
            }
        }

        controlContext.moveTo(convertValueToX(xValue), baselineY - tickLen);
        controlContext.lineTo(convertValueToX(xValue), baselineY + tickLen);

        if (xValue % 20 == 0) {
            controlContext.font         = "12px monospace";
            controlContext.textBaseline = "middle";
            controlContext.textAlign    = "center";
            controlContext.fillStyle    = "#303030";
            controlContext.fillText(Math.abs(xValue), convertValueToX(xValue), baselineY + 20);
        }
    }

    controlContext.lineWidth = 1.0;
    controlContext.lineCap = "round";
    controlContext.strokeStyle = "#303030";
    controlContext.stroke();

    controlContext.font         = "12px monospace";
    controlContext.textBaseline = "middle";
    controlContext.textAlign    = "center";
    controlContext.fillStyle    = "#303030";
    controlContext.fillText("TOE",  convertValueToX(-((sliderCount - 1) / 2 - 0.5) * sliderDistance), baselineY);
    controlContext.fillText("HEEL", convertValueToX( ((sliderCount - 1) / 2 - 0.5) * sliderDistance), baselineY);



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

function uiRedrawProfile() {
    const svg = document.getElementById("profile-svg");
    svg.innerHTML = "<circle cx='50' cy='50' r='" + 3 * sliderValues[0] + "' stroke='green' stroke-width='4' fill='yellow' />";
//console.log(svg.outerHTML);
}

/*****************************************************************************
 * Control canvas events
 *****************************************************************************/
function uiEventPosition(event) {
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
    position = uiEventPosition(event);
    if (position != undefined) {
        /* Find out if slider selected */
        for (let slider = 0; slider < sliderCount; slider++) {
            sliderX = convertSliderToX(slider);
            sliderY = convertValueToY(sliderValues[slider]);

            if (Math.abs(sliderX - position.x) + Math.abs(sliderY - position.y) < 20) {
                sliderToMove = slider;
            }
        }
    }

    return false;
}

function uiControlContinue(event) {

    if (sliderToMove != undefined) {
        position = uiEventPosition(event);
        if (position != undefined) {
            sliderValues[sliderToMove] = convertYToValue(position.y);
            uiRedrawControls();
            uiRedrawProfile();
        }
    }

    return false;
}

function uiControlEnd(event) {
    if (sliderToMove != undefined) {
        sliderToMove = undefined;
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

    /* Redraw controls and profile */
    uiRedrawControls();
    uiRedrawProfile();
}

uiInitControls();




//document.getElementById("debug-text").innerHTML = window.innerWidth;

