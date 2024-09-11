/* Control canvas definitions */
const controlCanvas  = document.getElementById("control-canvas");
const controlContext = controlCanvas.getContext("2d");
const controlCanvasWidth  = document.getElementById("app-screen").getBoundingClientRect().width;
const controlCanvasHeight = 420;
const controlCanvasMargin = {left: 50, right: 50, top: 5, bottom: 60};

/* Slider configurations */
const sliderValueMin  = 0.0;
const sliderValueMax  = 10.0;
var   sliderCount     = 7;
var   sliderDistance  = 50; /* mm */
var   sliderValues    = [];
var   sliderPositions = [];


/*****************************************************************************
 * Scaling conversion functions
 *****************************************************************************/
var canvasXScale = 1;
var canvasYScale = 1;

function calculateCanvasScale() {
    canvasXScale = (controlCanvasWidth - (controlCanvasMargin.left + controlCanvasMargin.right))  / (sliderCount - 1);
    canvasYScale = (controlCanvasHeight - (controlCanvasMargin.top + controlCanvasMargin.bottom)) / (sliderValueMax - sliderValueMin);
}


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

    /* Draw background */
    controlContext.clearRect(0, 0, controlCanvas.width, controlCanvas.height);
    controlContext.beginPath();
    controlContext.fillStyle   = "#B0DDFF";
    controlContext.rect(0, 0, controlCanvas.width, controlCanvas.height);
    controlContext.fill();

    /* Draw profile under sliders */
    controlContext.beginPath();
    var width  = controlCanvasWidth - (controlCanvasMargin.left + controlCanvasMargin.right);
    var height = controlCanvasHeight - (controlCanvasMargin.top + controlCanvasMargin.bottom);
    var xOrigo = controlCanvasMargin.left + width/2.0;
    var yOrigo = controlCanvasHeight - controlCanvasMargin.bottom;
//    var yMax   = (stencilHeightMax - stencilHeightMin); /* mm */
    var yMax   = 10; /* mm */
    var xScale = width / skateBladeSize;
    var yScale = height / yMax;

    controlContext.moveTo(xOrigo + xScale * profilePoints[0].x, yOrigo - yScale * profilePoints[0].y);
    for (let i = 1; i < profilePoints.length; i++) {
        controlContext.lineTo(xOrigo + xScale * profilePoints[i].x, yOrigo - yScale * profilePoints[i].y);
    }

    controlContext.fillStyle   = "none";
    controlContext.lineWidth   = 0.5;
    controlContext.lineCap     = "round";
    controlContext.strokeStyle = "#303030";
    controlContext.stroke();


    /* Draw profile ticks and legends */
    controlContext.beginPath();
    var yDelta = 0.5;
    var tickLen = 5;
    for (let y = 0; y <= yMax; y += yDelta) {
        if (y == Math.floor(y)) {
            controlContext.font         = "12px monospace";
            controlContext.textBaseline = "middle";
            controlContext.textAlign    = "center";
            controlContext.fillStyle    = "#303030";
            controlContext.fillText(y.toFixed(1) + "mm", sliderPositions[0].x - 30, yOrigo - yScale * y + 0.5);
            tickLen = 4;
        } else {
            tickLen = 2;
        }
    }
    controlContext.lineWidth   = 1.0;
    controlContext.lineCap     = "round";
    controlContext.strokeStyle = "#303030";
    controlContext.stroke();


    /* Draw slider tracks */
    controlContext.beginPath();
    for (let slider = 0; slider < sliderCount; slider++) {
        controlContext.moveTo(sliderPositions[slider].x, convertValueToY(sliderValueMin));
        controlContext.lineTo(sliderPositions[slider].x, convertValueToY(sliderValueMax));
    }
    controlContext.lineWidth   = 1.0;
    controlContext.lineCap     = "round";
    controlContext.strokeStyle = "#303030";
    controlContext.stroke();


    /* Draw slider ticks and legends */
    controlContext.beginPath();
    var yDelta = 0.5;
    var tickLen = 5;
    for (let y = sliderValueMin; y <= sliderValueMax; y += yDelta) {
        if (y == Math.floor(y)) {
            controlContext.font         = "12px monospace";
            controlContext.textBaseline = "middle";
            controlContext.textAlign    = "center";
            controlContext.fillStyle    = "#303030";
            controlContext.fillStyle    = "#0000FF";
            controlContext.fillText(y.toFixed(1) + "m", sliderPositions[sliderCount - 1].x + 30, convertValueToY(y));
            tickLen = 4;
        } else {
            tickLen = 2;
        }
        for (let slider = 0; slider < sliderCount; slider++) {
            controlContext.moveTo(sliderPositions[slider].x - tickLen, convertValueToY(y));
            controlContext.lineTo(sliderPositions[slider].x + tickLen, convertValueToY(y));
        }
    }
    controlContext.lineWidth   = 1.0;
    controlContext.lineCap     = "round";
    controlContext.strokeStyle = "#303030";
    controlContext.stroke();


}

function uiRedrawXLegend() {
    /* Draw legends */
    var baselineY = 25 + Math.floor(controlCanvasHeight - controlCanvasMargin.bottom) + 0.5;
    var legendLength = skateBladeSize * skateEffectiveLength;

    controlContext.beginPath();
    controlContext.moveTo( convertValueToX(-legendLength), baselineY);
    controlContext.lineTo( convertValueToX(+legendLength), baselineY);
    controlContext.stroke();

    controlContext.beginPath();

    for (let xValue = 0; xValue <= legendLength; xValue += 5) {
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

    controlContext.fillText("HEEL",  sliderPositions[0].x               + 40, baselineY);
    controlContext.fillText("TOE", sliderPositions[sliderCount - 1].x - 40, baselineY);
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

    var zoneStart = -skateBladeSize * skateEffectiveLength;
    var zoneScale =  skateBladeSize * skateEffectiveLength * 2 / lengthSum;

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

const okColor    = "#CEEAFF";
const errorColor = "#FF8888";
function uiRedrawFingerprint() {
    var fingerprint = "";

    fingerprint += skateBladeSize;

    for (let slider = sliderCount - 1; slider >= 0; slider--) {
        fingerprint += "-";
        if (Math.floor(sliderValues[slider]) == sliderValues[slider]) {
            var decimals = 0;
        } else {
            var decimals = sliderValues[slider].toString().split(".")[1].length;
        }
        if (decimals > 1) {
           fingerprint += sliderValues[slider].toFixed(decimals);
        } else {
           fingerprint += sliderValues[slider].toFixed(1);
        }
    }

    document.getElementById("fingerprint").value = fingerprint;
    document.getElementById("fingerprint").style.background = okColor;
}

function uiRedrawControls() {
    sliderDistance = skateBladeSize / (sliderCount - 1);

    /* Clear canvas */
    controlContext.clearRect(0, 0, controlCanvas.width, controlCanvas.height);

    /* Calculate slider positions */
    for (let slider = 0; slider < sliderCount; slider++) {
        sliderPositions[slider] = {
            x: convertSliderToX(slider),
            y: convertValueToY(sliderValues[slider]) };
    }

    calculateProfile(1.0);

    uiRedrawSliders();
    uiRedrawXLegend();
/*    uiRedrawZones(); */
    uiRedrawControlCurve();
    uiRedrawFingerprint();
}


/*****************************************************************************
 * Initialize control canvas
 *****************************************************************************/
function uiInitControls() {
    /* Initialize canvas area */
    uiInitCanvas(controlCanvas, controlCanvasWidth, controlCanvasHeight);

    for (let slider = 0; slider < sliderCount; slider++) {
        sliderValues[slider] = 1.0;
    }

    calculateCanvasScale();

    /* Redraw controls and profile */
    uiRedrawControls();
    uiRedrawStencil();
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

            if (sliderValues[sliderToMove] <= 0.01) {
                sliderValues[sliderToMove] = 0.03;
            }

            uiRedrawControls();
            uiRedrawStencil();
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
function uiFingerprintChange(event) {
    var fields = event.target.value.split("-");

/*
    var index = -1;
    for (let blade = 0; blade < skateBlades.length; blade++) {
        if (fields[0] == skateBlades[blade].size) {
            index = blade;
            break;
        }
    }

    if (index < 0) {
        event.target.style.background = errorColor;
        return;
    }
*/

    /* Check amount of fields */
    if (fields.length < 1 + 2) {
        event.target.style.background = errorColor;
        return;
    }

    /* Check slider values */
    for (let fieldIndex = 1; fieldIndex < fields.length; fieldIndex++) {
        if (isNaN(fields[fieldIndex]) == true) {
            event.target.style.background = errorColor;
            return;
        }

        if (isNaN(parseFloat(fields[fieldIndex])) == true) {
            event.target.style.background = errorColor;
            return;
        }

        if (parseFloat(fields[fieldIndex]) < 0.01) {
            event.target.style.background = errorColor;
            return;
        }
    }

    /* Set skate index and slider values */
//    skateBladeIndex = index;
    skateBladeSize  = fields[0];

    sliderCount = fields.length - 1;
    for (let fieldIndex = 1; fieldIndex < fields.length; fieldIndex++) {
        /* Reverse slider values */
        sliderValues[fieldIndex - 1] = parseFloat(fields[fields.length - fieldIndex]);
//        sliderValues[fieldIndex - 1] = parseFloat(fields[fieldIndex]);
    }

    event.target.style.background = okColor;

    calculateCanvasScale();
//    uiRedrawSizeButtons();
    uiRedrawControls();
    uiRedrawStencil();
}

function uiNameChange(event) {
    uiRedrawStencil();
}

document.getElementById("profile-name").addEventListener("change", uiNameChange);
document.getElementById("fingerprint").addEventListener("change", uiFingerprintChange);


//document.getElementById("debug-text").innerHTML = window.innerWidth;

