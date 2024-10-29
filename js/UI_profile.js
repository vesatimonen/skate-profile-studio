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
const profileHeightMax = 50;

const stencilSlotPosition = 120;
const stencilSlotWidth    = 8;
const stencilSlotHeight   = 13;

function svgDrawOutlinePROSHARP(x, y) {
    const profileHeightPROSHARP = stencilHeightMax - stencilHeightMin;

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
        /* Limit Y */
        if (isNaN(profilePoints[i].y) || profilePoints[i].y > profileHeightPROSHARP) {
            profilePoints[i].y = profileHeightPROSHARP;
        }

        stencilPoints[index] = {x: x + profilePoints[i].x, y: y + stencilHeightMax - profilePoints[i].y};
        index++;
    }

    /* Lower right */
    stencilPoints[index] = {x: x + stencilWidth / 2, y: y + stencilHeightMin};
    index++;

    svgDrawPath(stencilPoints, "black");
}


function svgDrawOutlineELITE(x, y) {
    const stencilHeightELITE = 40.0;
    const stencilWidthELITE  = 431.8;
    const profileHeightELITE = 5.5;

    /* Create stencil */
    stencilPoints = [];
    var index = 0;

    /* Upper right */
    stencilPoints[index] = {x: x + stencilWidthELITE / 2, y: y};
    index++;

    /* Lower right */
    stencilPoints[index] = {x: x + stencilWidthELITE / 2, y: y + stencilHeightELITE};
    index++;

    /* Lower left */
    stencilPoints[index] = {x: x - stencilWidthELITE / 2, y: y + stencilHeightELITE};
    index++;

    /* Upper left */
    stencilPoints[index] = {x: x - stencilWidthELITE / 2, y: y};
    index++;

    /* Profile */
    for (let i = 0; i < profilePoints.length; i++) {
        /* Limit Y */
        if (isNaN(profilePoints[i].y) || profilePoints[i].y > profileHeightELITE) {
            profilePoints[i].y = profileHeightELITE;
        }

        stencilPoints[index] = {x: x + profilePoints[i].x,
                                y: y + profileHeightELITE - profilePoints[i].y};
        index++;
    }

    /* Lower right */
    stencilPoints[index] = {x: x + stencilWidthELITE / 2, y: y};
    index++;

    /* Draw holes */
    var holeRadiusMm = 12.7 / 2.0;
    svgDrawCircle(x - 8 * 25.4 / 2, y + stencilHeightELITE - 3.0 - holeRadiusMm, holeRadiusMm, "black");
    svgDrawCircle(x + 8 * 25.4 / 2, y + stencilHeightELITE - 3.0 - holeRadiusMm, holeRadiusMm, "black");
/*
    svgDrawCircle(x + 95 + 15, y + stencilHeightELITE - 3.0 - holeRadiusMm, holeRadiusMm, "black");
    svgDrawCircle(x + 95 + 30, y + stencilHeightELITE - 3.0 - holeRadiusMm, holeRadiusMm, "black");
    svgDrawCircle(x + 95 + 45, y + stencilHeightELITE - 3.0 - holeRadiusMm, holeRadiusMm, "black");
*/

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

    /* Calculate origo position */
    var origoIndex = Math.floor(pivotIndex + skateOrigoX / profileStep);
    var origoX = profilePoints[origoIndex].x;

    /* Calculate right profile */
    var circle = {x: origoX,
                  y: calculateRadius(origoX),
                  radius: calculateRadius(origoX)}; /* Pivot point circle */
    for (let i = origoIndex + 1; i < profilePoints.length; i++) {
        var squareDelta = Math.pow(circle.radius, 2) - Math.pow(profilePoints[i].x - circle.x, 2);
        if (squareDelta > 0) {
            profilePoints[i].y = circle.y - Math.sqrt(squareDelta);
        } else {
            profilePoints[i].y = 2 * profilePoints[i - 1].y - profilePoints[i - 2].y;
        }


        var radiusRatio = profilePoints[i].radius / circle.radius;
        circle = {
            x:      profilePoints[i].x + (circle.x - profilePoints[i].x) * radiusRatio,
            y:      profilePoints[i].y + (circle.y - profilePoints[i].y) * radiusRatio,
            radius: profilePoints[i].radius
        };

//        profilePoints[i].y = profilePoints[i - 1].y + profilePoints[i].radius * 0.0001;
    }

    /* Calculate left profile */
    var circle = {x: origoX,
                  y: calculateRadius(origoX),
                  radius: calculateRadius(origoX)}; /* Pivot point circle */
    for (let i = origoIndex - 1; i >= 0; i--) {
        var squareDelta = Math.pow(circle.radius, 2) - Math.pow(circle.x - profilePoints[i].x, 2);
        if (squareDelta > 0) {
            profilePoints[i].y = circle.y - Math.sqrt(squareDelta);
        } else {
            profilePoints[i].y = 2 * profilePoints[i + 1].y - profilePoints[i + 2].y;
        }

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
        if (isNaN(profilePoints[i].y) || profilePoints[i].y > profileHeightMax) {
            profilePoints[i].y = profileHeightMax;
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
    svgDrawSliders(xCenter - 105,   6.5, 35.0);
    svgDrawOutlinePROSHARP(xCenter, 5.0);
    stencilSvg.innerHTML = svgContent;
}

function uiRedrawStencilELITE(xCenter, yCenter) {
    /* Draw stencil path */
    svgContent = "";
    var name = document.getElementById("profile-name").value;
    name = name.replace(/</g, "&lt;");
    name = name.replace(/>/g, "&gt;");
    name = name.replace(/"/g, "&quot;");
    name = name.replace(/'/g, "&#39;");
    svgDrawScale(  xCenter,         16, 40);
    svgDrawText(   xCenter,         28, "1.5mm", document.getElementById("fingerprint").value);
    svgDrawSliders(xCenter - 80,    32, 40.0);
    svgDrawText(   xCenter,         40, "2mm", name);
    svgDrawOutlineELITE(xCenter, 5.0);
    stencilSvg.innerHTML = svgContent;
}

function uiRedrawStencil() {
    var svgWidth  = parseFloat(stencilSvg.getAttribute("width")); /* mm */
    var svgHeight = parseFloat(stencilSvg.getAttribute("height")); /* mm */

    var bladeType = document.getElementById("blade-type").value;
    switch (bladeType) {
        case "prosharp":
            uiRedrawStencilPROSHARP(svgWidth / 2, svgHeight / 2);
            break;
        case "elite":
            uiRedrawStencilELITE(svgWidth / 2, svgHeight / 2);
            break;
    }
}

