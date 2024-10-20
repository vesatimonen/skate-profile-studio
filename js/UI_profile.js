const stencilSvg = document.getElementById("stencil-svg");

var stencilPoints = [];
var profilePoints = [];

var svgContent = "";

/*****************************************************************************
 * SVG helpers
 *****************************************************************************/
function svgDrawPath(points, color) {
    /* Create svg content */
    svgContent += "\n";
    svgContent += "  <polyline\n";
    svgContent += "    points='\n";
    for (let i = 0; i < points.length; i++) {
        svgContent += "      " + points[i].x + ", " + points[i].y + "\n";
    }
    svgContent += "    '\n";
    svgContent += "    stroke='" + color + "' stroke-width='0.2' fill='none'\n";
    svgContent += "  />\n";
}

function svgDrawText(x, y, size, text) {
    svgContent += "  <text\n";
    svgContent += "    x=" + x + "\n";
    svgContent += "    y=" + y + "\n";
    svgContent += "    style='\n";
    svgContent += "      font-style:   normal;\n";
    svgContent += "      font-size:    " + size + ";\n";
    svgContent += "      stroke:       blue;\n";
    svgContent += "      font-weight:  normal;\n";
    svgContent += "      font-family:  Arial;\n";
    svgContent += "      fill:         none;\n";
    svgContent += "      text-anchor:  middle;\n";
    svgContent += "      stroke-width: 0.2;\n";
    svgContent += "    '\n";
    svgContent += "  >\n";
    svgContent += "  " + text + "\n";
    svgContent += "  </text>\n";
}

function svgDrawLine(x1, y1, x2, y2) {
    svgContent += "  <line\n";
    svgContent += "    x1=" + x1 + "\n";
    svgContent += "    y1=" + y1 + "\n";
    svgContent += "    x2=" + x2 + "\n";
    svgContent += "    y2=" + y2 + "\n";
    svgContent += "    \n";
    svgContent += "    stroke='blue' stroke-width='0.2' fill='none'\n";
    svgContent += "  />\n";
}

function svgDrawCircle(x, y, r, color) {
    svgContent += "  <circle\n";
    svgContent += "    cx=" + x + "\n";
    svgContent += "    cy=" + y + "\n";
    svgContent += "    r="  + r + "\n";
    svgContent += "    \n";
    svgContent += "    stroke='" + color + "' stroke-width='0.2' fill='none'\n";
    svgContent += "  />\n";
}

const stencilWidth     = 400;
const stencilHeightMin = 20;
const stencilHeightMax = 32;

const stencilSlotPosition = 120;
const stencilSlotWidth    = 8;
const stencilSlotHeight   = 13;

function svgDrawOutlinePROSHARP(x, y) {
    /* Create stencil */
    stencilPoints = [];
    var index = 0;

    /* Lower right */
    stencilPoints[index] = {x: x + stencilWidth / 2, y: y + stencilHeightMin};
    index++;

    /* Upper right */
    stencilPoints[index] = {x: x + stencilWidth / 2, y: y};
    index++;

    /* Right slot */
    stencilPoints[index] = {x: x + stencilSlotPosition + stencilSlotWidth, y: y};
    index++;
    stencilPoints[index] = {x: x + stencilSlotPosition + stencilSlotWidth, y: y + stencilSlotHeight};
    index++;
    stencilPoints[index] = {x: x + stencilSlotPosition, y: y + stencilSlotHeight};
    index++;
    stencilPoints[index] = {x: x + stencilSlotPosition, y: y};
    index++;

    /* Left slot */
    stencilPoints[index] = {x: x - stencilSlotPosition, y: y};
    index++;
    stencilPoints[index] = {x: x - stencilSlotPosition, y: y + stencilSlotHeight};
    index++;
    stencilPoints[index] = {x: x - stencilSlotPosition - stencilSlotWidth, y: y + stencilSlotHeight};
    index++;
    stencilPoints[index] = {x: x - stencilSlotPosition - stencilSlotWidth, y: y};
    index++;

    /* Upper left */
    stencilPoints[index] = {x: x - stencilWidth / 2, y: y};
    index++;

    /* Lower left */
    stencilPoints[index] = {x: x - stencilWidth / 2, y: y + stencilHeightMin};
    index++;

    /* Profile */
    for (let i = 0; i < profilePoints.length; i++) {
        stencilPoints[index] = {x: x + profilePoints[i].x, y: y + stencilHeightMax - profilePoints[i].y};
        index++;
    }

    /* Lower right */
    stencilPoints[index] = {x: x + stencilWidth / 2, y: y + stencilHeightMin};
    index++;

    svgDrawPath(stencilPoints, "black");
}


function svgDrawOutlineRIKU(x, y) {
    var stencilHeightRIKU = 40.0;
    var profileHeightRIKU = stencilHeightMax - stencilHeightMin;

    /* Create stencil */
    stencilPoints = [];
    var index = 0;

    /* Upper right */
    stencilPoints[index] = {x: x + stencilWidth / 2, y: y};
    index++;

    /* Lower right */
    stencilPoints[index] = {x: x + stencilWidth / 2, y: y + stencilHeightRIKU};
    index++;

    /* Lower left */
    stencilPoints[index] = {x: x - stencilWidth / 2, y: y + stencilHeightRIKU};
    index++;

    /* Upper left */
    stencilPoints[index] = {x: x - stencilWidth / 2, y: y};
    index++;

    /* Profile */
    for (let i = 0; i < profilePoints.length; i++) {
        stencilPoints[index] = {x: x + profilePoints[i].x,
                                y: y + profileHeightRIKU - profilePoints[i].y};
        index++;
    }

    /* Lower right */
    stencilPoints[index] = {x: x + stencilWidth / 2, y: y};
    index++;

    /* Draw holes */
    var holeRadiusMm = 12.7 / 2.0;
    svgDrawCircle(x - 95, y + stencilHeightRIKU - 3.0 - holeRadiusMm, holeRadiusMm, "black");
    svgDrawCircle(x + 95, y + stencilHeightRIKU - 3.0 - holeRadiusMm, holeRadiusMm, "black");
    svgDrawCircle(x + 95 + 15, y + stencilHeightRIKU - 3.0 - holeRadiusMm, holeRadiusMm, "black");
    svgDrawCircle(x + 95 + 30, y + stencilHeightRIKU - 3.0 - holeRadiusMm, holeRadiusMm, "black");
    svgDrawCircle(x + 95 + 45, y + stencilHeightRIKU - 3.0 - holeRadiusMm, holeRadiusMm, "black");

    svgDrawPath(stencilPoints, "black");
}



function svgDrawScale(x, y, length) {
    /* Draw scale ticks */
    for (let xValue = 0; xValue < length; xValue += 5) {
        var tickLen = 0;
        if (xValue == 0) {
            tickLen = 6;
        } else {
            if (xValue % 10 == 0) {
                tickLen = 3;
            } else {
                tickLen = 2;
            }
        }
        svgDrawLine(x + xValue, y, x + xValue, y + tickLen);
        if (xValue != 0) {
            svgDrawLine(x - xValue, y, x - xValue, y + tickLen);
        }
    }

    /* Draw skate directions */
    svgDrawText(x - length - 12, y + 4, "1.5mm", "HEEL");
    svgDrawText(x + length + 12, y + 4, "1.5mm", "TOE");
}

function svgDrawSliders(x, y, scale) {
    var points = [];

    width  = controlCanvasWidth  / scale;
    height = controlCanvasHeight / scale;

    /* Border */
    points[0] = {x: x - width/2, y: y};
    points[1] = {x: x + width/2, y: y};
    points[2] = {x: x + width/2, y: y + height};
    points[3] = {x: x - width/2, y: y + height};
    points[4] = {x: x - width/2, y: y};
    svgDrawPath(points, "blue");

    svgDrawLine(x, y + 3 * height / 4,
                x, y + height);

    /* Slider curve */
    points = [];
    for (let slider = 0; slider < sliderCount; slider++) {
        points[slider] = {x: x + slider * width / (sliderCount - 1) - width/2,
                          y: y + height - height * sliderValues[slider] / sliderValueMax};
    }
    svgDrawPath(points, "blue");
}

/*****************************************************************************
 * Profile calculation
 *****************************************************************************/
/* Origo in skate middle point (mm) */
function calculateRadius(x) {
    var y;

    var skateSize = skateBladeSize;

    var sliderLeft;
    var sliderRight;
    var sliderT;

    /* Calculate slider zone and relative position in zone */
    sliderLeft  = Math.floor((x + skateSize / 2.0) / sliderDistance);
    sliderRight = sliderLeft + 1;
    sliderT     = (x + skateSize / 2.0) / sliderDistance - sliderLeft;

    /* Check slider limits */
    if (sliderLeft < 0 ) {
        return sliderValues[0];
    }
    if (sliderLeft >= sliderCount - 1) {
        return sliderValues[sliderCount - 1];
    }

    /* Calculate radius */
    y = sliderValues[sliderLeft] * (1.0 - sliderT) + sliderT * sliderValues[sliderRight];

//    console.log(x + " / " + sliderLeft + " / " + sliderT);

    return y * 1000; /* mm */
}


function calculateProfile(profileStep) {
    var skateSize = skateBladeSize;

    profilePoints = [];

    /* Calculate point count */
    halfPointCount  = Math.floor((skateSize / 2.0) / profileStep);
    totalPointCount = 2 * halfPointCount - 1;
    pivotIndex      = halfPointCount - 1;

    /* Initialize points */
    for (let index = 0; index < halfPointCount; index++) {
        profilePoints[pivotIndex + index] = {x:  index * profileStep, y: 0, radius: calculateRadius(index * profileStep)};
        profilePoints[pivotIndex - index] = {x: -index * profileStep, y: 0, radius: calculateRadius(-index * profileStep)};
    }

    /* Calculate right profile */
    var circle = {x: 0.0, y: calculateRadius(0.0), radius: calculateRadius(0.0)}; /* Pivot point circle */
    for (let i = pivotIndex + 1; i < profilePoints.length; i++) {
        profilePoints[i].y = circle.y - Math.sqrt(Math.pow(circle.radius, 2) - Math.pow(profilePoints[i].x - circle.x, 2));

        var radiusRatio = profilePoints[i].radius / circle.radius;
        circle = {
            x:      profilePoints[i].x + (circle.x - profilePoints[i].x) * radiusRatio,
            y:      profilePoints[i].y + (circle.y - profilePoints[i].y) * radiusRatio,
            radius: profilePoints[i].radius
        };

//        profilePoints[i].y = profilePoints[i - 1].y + profilePoints[i].radius * 0.0001;
    }

    /* Calculate left profile */
    var circle = {x: 0.0, y: calculateRadius(0.0), radius: calculateRadius(0.0)}; /* Pivot point circle */
    for (let i = pivotIndex - 1; i >= 0; i--) {
        profilePoints[i].y = circle.y - Math.sqrt(Math.pow(circle.radius, 2) - Math.pow(circle.x - profilePoints[i].x, 2));

        var radiusRatio = profilePoints[i].radius / circle.radius;
        circle = {
            x:      profilePoints[i].x + (circle.x - profilePoints[i].x) * radiusRatio,
            y:      profilePoints[i].y + (circle.y - profilePoints[i].y) * radiusRatio,
            radius: profilePoints[i].radius
        };

//        profilePoints[i].y = profilePoints[i + 1].y + profilePoints[i].radius * 0.0001;
    }

    /* Limit Y values */
    for (let i = 0; i < profilePoints.length; i++) {
        if (isNaN(profilePoints[i].y) || profilePoints[i].y > stencilHeightMax - stencilHeightMin) {
            profilePoints[i].y = stencilHeightMax - stencilHeightMin;
        }
    }
}

/*****************************************************************************
 * Stencil draw
 *****************************************************************************/
function uiRedrawStencilPROSHARP(xCenter, yCenter) {
    /* Draw stencil path */
    svgContent = "";
    var name = document.getElementById("profile-name").value;
    name = name.replace(/</g, "&lt;");
    name = name.replace(/>/g, "&gt;");
    name = name.replace(/"/g, "&quot;");
    name = name.replace(/'/g, "&#39;");
    svgDrawText(   xCenter,         15, "2mm", name);
    svgDrawText(   xCenter,         24, "1.5mm", document.getElementById("fingerprint").value);
    svgDrawScale(  xCenter,         28, 40);
    svgDrawSliders(xCenter + 105,   6.5, 35.0);
    svgDrawSliders(xCenter - 105,   6.5, 35.0);
    svgDrawOutlinePROSHARP(xCenter, 5.0);
    stencilSvg.innerHTML = svgContent;
}

function uiRedrawStencilRIKU(xCenter, yCenter) {
    /* Draw stencil path */
    svgContent = "";
    var name = document.getElementById("profile-name").value;
    name = name.replace(/</g, "&lt;");
    name = name.replace(/>/g, "&gt;");
    name = name.replace(/"/g, "&quot;");
    name = name.replace(/'/g, "&#39;");
    svgDrawText(   xCenter,         40, "2mm", name);
    svgDrawText(   xCenter,         31, "1.5mm", document.getElementById("fingerprint").value);
    svgDrawScale(  xCenter,         19, 40);
    svgDrawSliders(xCenter + 75,    33, 40.0);
    svgDrawSliders(xCenter - 75,    33, 40.0);
    svgDrawOutlineRIKU(xCenter, 5.0);
    stencilSvg.innerHTML = svgContent;
}

function uiRedrawStencil() {
    var svgWidth  = parseFloat(stencilSvg.getAttribute("width")); /* mm */
    var svgHeight = parseFloat(stencilSvg.getAttribute("height")); /* mm */

//    uiRedrawStencilPROSHARP(svgWidth / 2, svgHeight / 2);
    uiRedrawStencilRIKU(svgWidth / 2, svgHeight / 2);
}

