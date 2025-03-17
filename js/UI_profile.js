const stencilSvg = document.getElementById("template-svg");

var templatePoints = [];
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

function svgDrawOutlinePROSHARP3D(x, y) {
    const profileHeightPROSHARP = stencilHeightMax - stencilHeightMin;

    /* Create stencil */
    templatePoints = [];
    var index = 0;

    /* Lower right */
    templatePoints[index] = {x: x + stencilWidth / 2, y: y + stencilHeightMin};
    index++;

    /* Upper right */
    templatePoints[index] = {x: x + stencilWidth / 2, y: y};
    index++;

    /* Right slot */
    templatePoints[index] = {x: x + stencilSlotPosition + stencilSlotWidth, y: y};
    index++;
    templatePoints[index] = {x: x + stencilSlotPosition + stencilSlotWidth, y: y + stencilSlotHeight};
    index++;
    templatePoints[index] = {x: x + stencilSlotPosition, y: y + stencilSlotHeight};
    index++;
    templatePoints[index] = {x: x + stencilSlotPosition, y: y};
    index++;

    /* Left slot */
    templatePoints[index] = {x: x - stencilSlotPosition, y: y};
    index++;
    templatePoints[index] = {x: x - stencilSlotPosition, y: y + stencilSlotHeight};
    index++;
    templatePoints[index] = {x: x - stencilSlotPosition - stencilSlotWidth, y: y + stencilSlotHeight};
    index++;
    templatePoints[index] = {x: x - stencilSlotPosition - stencilSlotWidth, y: y};
    index++;

    /* Upper left */
    templatePoints[index] = {x: x - stencilWidth / 2, y: y};
    index++;

    /* Lower left */
    templatePoints[index] = {x: x - stencilWidth / 2, y: y + stencilHeightMin};
    index++;

    /* Profile */
    for (let i = 0; i < profilePoints.length; i++) {
        /* Limit Y */
        if (isNaN(profilePoints[i].y) || profilePoints[i].y > profileHeightPROSHARP) {
            profilePoints[i].y = profileHeightPROSHARP;
        }

        templatePoints[index] = {x: x + profilePoints[i].x, y: y + stencilHeightMax - profilePoints[i].y};
        index++;
    }

    /* Lower right */
    templatePoints[index] = {x: x + stencilWidth / 2, y: y + stencilHeightMin};
    index++;

    svgDrawPath(templatePoints, "black");
}

function svgDrawOutlinePROSHARP(x, y) {
    const profileHeightPROSHARP = stencilHeightMax - stencilHeightMin;

    /* Create stencil */
    templatePoints = [];
    var index = 0;

    /* Lower right */
    templatePoints[index] = {x: x + stencilWidth / 2, y: y + stencilHeightMin};
    index++;

    /* Upper right */
    templatePoints[index] = {x: x + stencilWidth / 2, y: y};
    index++;

    /* Right slot */
    templatePoints[index] = {x: x + stencilSlotPosition + stencilSlotWidth, y: y};
    index++;
    templatePoints[index] = {x: x + stencilSlotPosition + stencilSlotWidth, y: y + stencilSlotHeight};
    index++;
    templatePoints[index] = {x: x + stencilSlotPosition, y: y + stencilSlotHeight};
    index++;
    templatePoints[index] = {x: x + stencilSlotPosition, y: y};
    index++;

    /* Left slot */
    templatePoints[index] = {x: x - stencilSlotPosition, y: y};
    index++;
    templatePoints[index] = {x: x - stencilSlotPosition, y: y + stencilSlotHeight};
    index++;
    templatePoints[index] = {x: x - stencilSlotPosition - stencilSlotWidth, y: y + stencilSlotHeight};
    index++;
    templatePoints[index] = {x: x - stencilSlotPosition - stencilSlotWidth, y: y};
    index++;

    /* Upper left */
    templatePoints[index] = {x: x - stencilWidth / 2, y: y};
    index++;

    /* Lower left */
    templatePoints[index] = {x: x - stencilWidth / 2, y: y + stencilHeightMin};
    index++;

    /* Profile */
    for (let i = 0; i < profilePoints.length; i++) {
        /* Limit Y */
        if (isNaN(profilePoints[i].y) || profilePoints[i].y > profileHeightPROSHARP) {
            profilePoints[i].y = profileHeightPROSHARP;
        }

        templatePoints[index] = {x: x + profilePoints[i].x, y: y + stencilHeightMax - profilePoints[i].y};
        index++;
    }

    /* Lower right */
    templatePoints[index] = {x: x + stencilWidth / 2, y: y + stencilHeightMin};
    index++;

    svgDrawPath(templatePoints, "black");
}

function svgDrawOutlineELITE(x, y) {
    const stencilHeightELITE = 40.0;
    const stencilWidthELITE  = 431.8;
    const profileHeightELITE = 5.5;

    /* Create stencil */
    templatePoints = [];
    var index = 0;

    /* Upper right */
    templatePoints[index] = {x: x + stencilWidthELITE / 2, y: y};
    index++;

    /* Lower right */
    templatePoints[index] = {x: x + stencilWidthELITE / 2, y: y + stencilHeightELITE};
    index++;

    /* Lower left */
    templatePoints[index] = {x: x - stencilWidthELITE / 2, y: y + stencilHeightELITE};
    index++;

    /* Upper left */
    templatePoints[index] = {x: x - stencilWidthELITE / 2, y: y};
    index++;

    /* Profile */
    for (let i = 0; i < profilePoints.length; i++) {
        /* Limit Y */
        if (isNaN(profilePoints[i].y) || profilePoints[i].y > profileHeightELITE) {
            profilePoints[i].y = profileHeightELITE;
        }

        templatePoints[index] = {x: x + profilePoints[i].x,
                                y: y + profileHeightELITE - profilePoints[i].y};
        index++;
    }

    /* Lower right */
    templatePoints[index] = {x: x + stencilWidthELITE / 2, y: y};
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

    svgDrawPath(templatePoints, "black");
}


var bauer272String = "L 249.325 136.917 L 249.455 135.585 L 249.624 133.672 L 249.523 130.72 L 249.107 128.078 L 248.892 126.937 L 248.312 125.719 L 247.427 125.04 L 246.884 124.923 L 246.331 125.034 L 239.035 128.17 L 233.668 130.274 L 228.24 132.216 L 222.757 133.997 L 217.225 135.617 L 207.91 137.947 L 203.206 138.899 L 198.468 139.649 L 197.834 139.708 L 197.147 139.655 L 196.524 139.369 L 196.083 138.727 L 195.975 138.084 L 196.102 137.535 L 196.725 136.547 L 198.012 134.797 L 198.857 133.659 L 199.57 132.44 L 199.608 131.821 L 199.401 131.233 L 198.987 130.78 L 198.406 130.564 L 197.784 130.584 L 197.218 130.821 L 196.186 131.536 L 183.454 140.17 L 181.799 141.175 L 180.913 141.552 L 179.968 141.751 L 177.805 141.883 L 175.637 141.969 L 161.369 142.389 L 147.096 142.618 L 120.75 142.921 L 115.768 142.929 L 101.094 142.903 L 87.5863 142.888 L 80.8715 142.871 L 71.5789 142.633 L 57.3615 142.403 L 51.9376 142.225 L 50.8758 142.239 L 50.3639 142.142 L 49.9079 141.875 L 48.7612 140.433 L 48.0982 139.801 L 47.3215 139.308 L 46.7446 138.983 L 46.0768 138.897 L 45.4448 139.074 L 44.9755 139.54 L 44.7437 140.465 L 44.7211 141.417 L 44.7429 142.377 L 44.6446 143.322 L 44.423 143.814 L 44.0637 144.22 L 43.599 144.48 L 43.0615 144.534 L 29.4918 144.352 L 28.7296 144.09 L 28.0741 143.625 L 26.7767 142.653 L 25.2405 141.835 L 24.4062 141.6 L 23.5375 141.54 L 17.4065 141.158 L 16.7344 140.617 L 16.1666 139.968 L 15.0681 138.63 L 8.88559 131.203 L 8.15195 130.414 L 7.26942 129.792 L 5.60193 128.779 L 3.79364 128.043 L 0.98369 127.195 L 0.29346 127.329 L -0.336271 127.634 L -1.54978 128.36 L -2.8055 129.086 L -3.36889 129.529 L -3.79485 130.109 L -3.85039 130.682 L -3.67514 131.232 L -3.3146 131.685 L -2.81432 131.971 L 3.7127 135.344 L 4.14747 135.921 L 4.32133 136.613 L 4.28675 137.345 L 4.09621 138.042 L 3.78689 138.696 L 3.25656 139.18 L 2.58857 139.462 L 1.8663 139.51 L -1.1669 139.045 L -7.75339 137.852 L -14.3005 136.459 L -20.8072 134.886 L -27.2724 133.152 L -34.7553 130.847 L -42.1542 128.518 L -43.6559 128.309 L -44.4039 128.406 L -45.0856 128.679 L -45.4901 129.018 L -45.7606 129.477 L -46.1943 130.588 L -46.6034 132.29 L -46.801 134.052 L -46.8938 135.886 L -46.8853 137.767 L -46.6937 140.105 L -46.2135 142.868";

function svgDrawOutlineBlade(x, y, bladeString) {
    const profileHeightBlade = 40.0;

    /* Parse blade path string */
    var bladePath = [];
    var bladePathIndex = 0;
    const parts = bladeString.split(" ");
    let i = 0;
    while (i < parts.length) {
        const command = parts[i];
        switch (command) {
            case "M":
            case "L":
                bladePath[bladePathIndex] = {x: parseFloat(parts[i + 1]), y: parseFloat(parts[i + 2])};
                bladePathIndex++;
                i += 3;
                break;
            default:
                i++;
        }
    }

    /* Find minimum and maximum value */
    var minX = +1000000.0;
    var minY = +1000000.0;
    var maxX = -1000000.0;
    var maxY = -1000000.0;
    for (let i = 0; i < bladePath.length; i++) {
        if (bladePath[i].x < minX) {
            minX = bladePath[i].x;
        }
        if (bladePath[i].y < minY) {
            minY = bladePath[i].y;
        }
        if (bladePath[i].x > maxX) {
            maxX = bladePath[i].x;
        }
        if (bladePath[i].y > maxY) {
            maxY = bladePath[i].y;
        }
    }

    /* Shift blade to middle */
    const xShift = x - (minX + maxX) / 2.0;
    const yShift = y - minY;
    for (let i = 0; i < bladePath.length; i++) {
        bladePath[i].x += xShift;
        bladePath[i].y += yShift;
    }

    /* Find start and end points */
    const rightPoints = [bladePath[0], bladePath[1]];
    const leftPoints  = [bladePath[bladePath.length - 1], bladePath[bladePath.length - 2]];

    /* Create stencil */
    templatePoints = [];
    var index = 0;

    /* Add profile points */
    for (let i = 0; i < profilePoints.length; i++) {
        /* Shift profile to right position */
        templatePoints[index] = {x: x + profilePoints[i].x,
                                y: y + profileHeightBlade - profilePoints[i].y};

        /* Calculate slopes */
        var kLeft         = (leftPoints[1].y - leftPoints[0].y)  / (leftPoints[1].x - leftPoints[0].x);
        var kRight        = (rightPoints[1].y - rightPoints[0].y) / (rightPoints[1].x - rightPoints[0].x);
        var kCurrentLeft  = (templatePoints[index].y - leftPoints[0].y)  / (templatePoints[index].x - leftPoints[0].x);
        var kCurrentRight = (templatePoints[index].y - rightPoints[0].y) / (templatePoints[index].x - rightPoints[0].x);
        var kCurrent      = undefined;
        if (index > 0) {
            kCurrent = (templatePoints[index - 1].y - templatePoints[index].y) / (templatePoints[index - 1].x - templatePoints[index].x);

            if (kCurrent < kCurrentRight
             || kCurrentRight < kRight) {
                /* Remove added item from table */
                templatePoints.pop();
                break;
            }

            if (kCurrent > kCurrentLeft
             || kCurrentLeft > kLeft) {
                /* Remove first item from table */
                templatePoints.shift();
                continue;
            }
        }

        index++;
    }

    /* Add blade upper part points */
    for (let i = 0; i < bladePath.length; i++) {
        templatePoints[index] = {x: bladePath[i].x, y: bladePath[i].y};

        index++;
    }

    templatePoints[index] = templatePoints[0];


    svgDrawPath(templatePoints, "black");
}


function svgDrawScale(x, y, length, printText) {
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
    if (printText) {
        svgDrawText(x - length - 12, y + 4, "1.5mm", "HEEL");
        svgDrawText(x + length + 12, y + 4, "1.5mm", "TOE");
    }
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
//            profilePoints[i].y = profileHeightMax;
        }
    }
}

/*****************************************************************************
 * Stencil draw
 *****************************************************************************/
function uiRedrawStencilPROSHARP3D(xCenter, yCenter) {
    /* Draw stencil path */
    svgContent = "";
    var name = document.getElementById("profile-name").value;
    name = name.replace(/</g, "&lt;");
    name = name.replace(/>/g, "&gt;");
    name = name.replace(/"/g, "&quot;");
    name = name.replace(/'/g, "&#39;");
    svgDrawText(   xCenter,         15, "2mm", name);
    svgDrawText(   xCenter,         24, "1.5mm", document.getElementById("fingerprint").value);
    svgDrawScale(  xCenter,         28, 40, true);
    svgDrawSliders(xCenter - 105,   6.5, 35.0);
    svgDrawOutlinePROSHARP3D(xCenter, 5.0);
    stencilSvg.innerHTML = svgContent;
}

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
    svgDrawScale(  xCenter,         28, 40, true);
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
    svgDrawScale(  xCenter,         16, 40, true);
    svgDrawText(   xCenter,         28, "1.5mm", document.getElementById("fingerprint").value);
    svgDrawSliders(xCenter - 80,    32, 40.0);
    svgDrawText(   xCenter,         40, "2mm", name);
    svgDrawOutlineELITE(xCenter, 5.0);
    stencilSvg.innerHTML = svgContent;
}

function uiRedrawStencilBlade(xCenter, yCenter, bladeString) {
    /* Draw stencil path */
    svgContent = "";
    var name = document.getElementById("profile-name").value;
    name = name.replace(/</g, "&lt;");
    name = name.replace(/>/g, "&gt;");
    name = name.replace(/"/g, "&quot;");
    name = name.replace(/'/g, "&#39;");
    svgDrawSliders(xCenter - 100,   24, 40.0);
    svgDrawScale(  xCenter,         25, 40, false);
//    svgDrawText(   xCenter,         28, "1.5mm", document.getElementById("fingerprint").value);
    svgDrawText(   xCenter,         37, "2mm", name);
    svgDrawOutlineBlade(xCenter, 5.0, bladeString);
    stencilSvg.innerHTML = svgContent;
}

function uiRedrawStencil() {
    var svgWidth  = parseFloat(stencilSvg.getAttribute("width")); /* mm */
    var svgHeight = parseFloat(stencilSvg.getAttribute("height")); /* mm */

    var bladeType = document.getElementById("blade-type").value;
    switch (bladeType) {
        case "prosharp-3D":
            uiRedrawStencilPROSHARP3D(svgWidth / 2, svgHeight / 2);
            break;
        case "prosharp":
            uiRedrawStencilPROSHARP(svgWidth / 2, svgHeight / 2);
            break;
        case "elite":
            uiRedrawStencilELITE(svgWidth / 2, svgHeight / 2);
            break;
        case "bauer-272":
            uiRedrawStencilBlade(svgWidth / 2, svgHeight / 2, bauer272String);
            break;
    }
}

