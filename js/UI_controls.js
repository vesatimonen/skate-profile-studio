/* Control canvas definitions */
const controlCanvas  = document.getElementById("control-canvas");
const controlContext = controlCanvas.getContext("2d");
const controlCanvasWidth  = document.getElementById("app-screen").getBoundingClientRect().width;
const controlCanvasHeight = 420;
const controlCanvasMargin = {left: 50, right: 50, top: 20, bottom: 100};

/* Slider configurations */
const sliderCount    = 9;
const sliderValueMin = 1.0;
const sliderValueMax = 10.0;

var   sliderDistance  = 50; /* mm */
var   sliderValues    = [];
var   sliderPositions = [];


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
function uiRedrawSliders() {
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
}

function uiRedrawXLegend() {
    /* Draw legends */
    var baselineY = 25 + Math.floor(controlCanvasHeight - controlCanvasMargin.bottom) + 0.5;
    controlContext.beginPath();
    controlContext.moveTo( sliderPositions[1].x, baselineY);
    controlContext.lineTo( sliderPositions[sliderCount - 2].x, baselineY);
    controlContext.stroke();

    controlContext.beginPath();
    for (let xValue = 0; xValue <= ((sliderCount - 1) / 2 - 1) * sliderDistance; xValue += 5) {
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
        if (xValue != 0) {
            controlContext.moveTo(convertValueToX(-xValue), baselineY - tickLen);
            controlContext.lineTo(convertValueToX(-xValue), baselineY + tickLen);
        }

        if (xValue % 20 == 0) {
            controlContext.font         = "12px monospace";
            controlContext.textBaseline = "middle";
            controlContext.textAlign    = "center";
            controlContext.fillStyle    = "#303030";
            controlContext.fillText(Math.abs(xValue), convertValueToX(xValue), baselineY + 15);
            if (xValue != 0) {
                controlContext.fillText(Math.abs(xValue), convertValueToX(-xValue), baselineY + 15);
            }
        }
    }
    controlContext.lineWidth = 1.0;
    controlContext.lineCap = "round";
    controlContext.strokeStyle = "#303030";
    controlContext.stroke();

    /* TOE/HEEL texts */
    controlContext.font         = "12px monospace";
    controlContext.textBaseline = "middle";
    controlContext.textAlign    = "center";
    controlContext.fillStyle    = "#303030";
    controlContext.fillText("TOE",  convertValueToX(-((sliderCount - 1) / 2 - 0.5) * sliderDistance), baselineY);
    controlContext.fillText("HEEL", convertValueToX( ((sliderCount - 1) / 2 - 0.5) * sliderDistance), baselineY);
}

const skateZones = [
    {length: 3, color: "#FF4040", label: "acceleration"},
    {length: 2, color: "#EEEE40", label: "agility"},
    {length: 9, color: "#00EE00", label: "speed"},
    {length: 3, color: "#6060FF", label: "stability"},
];

function uiRedrawZones() {
    /* Draw effective skate blade lengths */
    var baselineY = 75 + Math.floor(controlCanvasHeight - controlCanvasMargin.bottom) + 0.5;

    var lengthSum = 0;
    for (let zone = 0; zone < skateZones.length; zone++) {
        lengthSum = lengthSum + skateZones[zone].length;
    }

    var zoneStart = -skateBlades[skateBladeIndex].effectiveLength;
    var zoneScale = skateBlades[skateBladeIndex].effectiveLength * 2 / lengthSum;

    var zoneCurrent = 0;
    for (let zone = 0; zone < skateZones.length; zone++) {
        var startZoneX = convertValueToX(zoneStart + zoneCurrent * zoneScale) + 7;
        var endZoneX   = convertValueToX(zoneStart + (zoneCurrent + skateZones[zone].length) * zoneScale) - 7;

        controlContext.beginPath();
        controlContext.moveTo(startZoneX, baselineY);
        controlContext.lineTo(endZoneX, baselineY);
        controlContext.lineWidth = 12.0;
        controlContext.lineCap = "round";
        controlContext.strokeStyle = skateZones[zone].color;
        controlContext.stroke();

        /* TOE/HEEL texts */
        controlContext.font         = "12px monospace";
        controlContext.textBaseline = "middle";
        controlContext.textAlign    = "center";
        controlContext.fillStyle    = "#303030";
        if (zone % 2 == 0) {
            controlContext.fillText(skateZones[zone].label,  (startZoneX + endZoneX) / 2, baselineY + 14);
        } else {
            controlContext.fillText(skateZones[zone].label,  (startZoneX + endZoneX) / 2, baselineY - 14);
        }

        zoneCurrent += skateZones[zone].length;
    }
}

function uiRedrawControlCurve() {
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


// https://www.particleincell.com/2012/bezier-splines/
/*
controlContext.beginPath();
controlContext.moveTo(sliderPositions[0].x, sliderPositions[0].y);

    var t = 1.0;
    for (var i = 0; i < sliderCount - 1; i++) {
        var p0 = (i > 0) ? sliderPositions[i - 1] : sliderPositions[0];
        var p1 = sliderPositions[i];
        var p2 = sliderPositions[i + 1];
        var p3 = (i != sliderCount - 2) ? sliderPositions[i + 2] : p2;

        var cp1x = p1.x + (p2.x - p0.x) / 6 * t;
        var cp1y = p1.y + (p2.y - p0.y) / 6 * t;

        var cp2x = p2.x - (p3.x - p1.x) / 6 * t;
        var cp2y = p2.y - (p3.y - p1.y) / 6 * t;

        controlContext.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }
controlContext.stroke();
*/

/*
controlContext.beginPath();
controlContext.moveTo(sliderPositions[0].x, sliderPositions[0].y);

var slider;
for (slider = 1; slider < sliderCount - 2; slider++) {
      var xc = (sliderPositions[slider].x + sliderPositions[slider + 1].x) / 2;
      var yc = (sliderPositions[slider].y + sliderPositions[slider + 1].y) / 2;
      controlContext.quadraticCurveTo(sliderPositions[slider].x, sliderPositions[slider].y, xc, yc);
}
controlContext.quadraticCurveTo(sliderPositions[slider].x, sliderPositions[slider].y, sliderPositions[slider+1].x,sliderPositions[slider+1].y);

controlContext.lineWidth = 3;
controlContext.strokeStyle = "#0000ff";
controlContext.stroke();
*/
}

function uiRedrawFingerprint() {
    var fingerprint = "";

    fingerprint += skateBlades[skateBladeIndex].size;

    for (let slider = 0; slider < sliderCount; slider++) {
        fingerprint += "-";
        fingerprint += sliderValues[slider].toFixed(1);
    }

    document.getElementById("fingerprint-form").value = fingerprint;
    document.getElementById("fingerprint-form").style.background = "none";
}

function uiRedrawControls() {
    sliderDistance = skateBlades[skateBladeIndex].size / (sliderCount - 1);

    /* Clear canvas */
    controlContext.clearRect(0, 0, controlCanvas.width, controlCanvas.height);

    /* Calculate slider positions */
    for (let slider = 0; slider < sliderCount; slider++) {
        sliderPositions[slider] = {
            x: convertSliderToX(slider),
            y: convertValueToY(sliderValues[slider]) };
    }

    uiRedrawSliders();
    uiRedrawXLegend();
    uiRedrawZones();
    uiRedrawControlCurve();
    uiRedrawFingerprint();
}

function uiRedrawProfile() {
    const svg = document.getElementById("profile-svg");
    svg.innerHTML = "<circle cx='" + (50 + 3 * sliderValues[1]) + "' cy='" + (50 - 3 * sliderValues[2]) + "' r='" + 3 * sliderValues[0] + "' stroke='green' stroke-width='4' fill='yellow' />";
}

/*****************************************************************************
 * Initialize control canvas
 *****************************************************************************/
function uiInitControls() {
    /* Initialize canvas area */
    uiInitCanvas(controlCanvas, controlCanvasWidth, controlCanvasHeight);

    for (let slider = 0; slider < sliderCount; slider++) {
        sliderValues[slider] = sliderValueMin;
    }

    /* Redraw controls and profile */
    uiRedrawControls();
    uiRedrawProfile();
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
 * Form events
 *****************************************************************************/
function uiFormChange(event) {
    var fields = event.target.value.split("-");

    var index = -1;
    for (let blade = 0; blade < skateBlades.length; blade++) {
        if (fields[0] == skateBlades[blade].size) {
            index = blade;
            break;
        }
    }

    /* Check that blade size found */
    if (index < 0) {
        event.target.style.background = "#FF8888";
        return;
    }

    /* Check amount of fields */
    if (fields.length != 1 + sliderCount) {
        event.target.style.background = "#FF8888";
        return;
    }

    /* Check slider values */
    for (let fieldIndex = 1; fieldIndex < fields.length; fieldIndex++) {
        if (isNaN(fields[fieldIndex]) == true) {
            event.target.style.background = "#FF8888";
            return;
        }

        if (parseFloat(fields[fieldIndex]) < sliderValueMin ||
            parseFloat(fields[fieldIndex]) > sliderValueMax) {
            event.target.style.background = "#FF8888";
            return;
        }
    }

    /* Set skate index and slider values */
    skateBladeIndex = index;
    for (let fieldIndex = 1; fieldIndex < fields.length; fieldIndex++) {
        sliderValues[fieldIndex - 1] = parseFloat(fields[fieldIndex]);
    }

    event.target.style.background = "none";

    uiRedrawSizeButtons();
    uiRedrawControls();
    uiRedrawProfile();
}

document.getElementById("fingerprint-form").addEventListener("change", uiFormChange);


//document.getElementById("debug-text").innerHTML = window.innerWidth;

