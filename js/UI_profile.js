const stencilSvg = document.getElementById("stencil-svg");

var stencilPoints = [];
var profilePoints = [];

const profileStep = 1.0;

var svgContent = "";
var svgWidth;
var svgHeight;

/*****************************************************************************
 * SVG helpers
 *****************************************************************************/
function svgDrawPath(points) {
    /* Create svg content */
    svgContent += "\n";
    svgContent += "  <polyline\n";
    svgContent += "    points='\n";
    for (let i = 0; i < points.length; i++) {
        svgContent += "      " + points[i].x + ", " + points[i].y + "\n";
    }
    svgContent += "    '\n";
    svgContent += "    stroke='black' stroke-width='0.2' fill='none'\n";
    svgContent += "  />\n";
}

function svgDrawText(text, x, y) {
    svgContent += "  <text\n";
    svgContent += "    x=" + x + "\n";
    svgContent += "    y=" + y + "\n";
    svgContent += "    style='\n";
    svgContent += "      font-style:   normal;\n";
    svgContent += "      font-size:    4mm;\n";
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
    svgContent += "    '\n";
    svgContent += "    stroke='blue' stroke-width='0.2' fill='none'\n";
    svgContent += "  />\n";

}

function svgDrawOutline() {
    /* Calculate stencil profile */
    calculateProfile();

    /* Create stencil */
    stencilPoints = [];
    var index = 0;

    stencilPoints[index] = {x:395, y:50};
    index++;
    stencilPoints[index] = {x:395, y:5};
    index++;
    stencilPoints[index] = {x:5, y:5};
    index++;
    stencilPoints[index] = {x:5, y:50};
    index++;
    for (let i = 0; i < profilePoints.length; i++) {
        stencilPoints[index] = {x:svgWidth / 2 + profilePoints[i].x, y:svgHeight - profilePoints[i].y};
        index++;
    }
    stencilPoints[index] = {x:395, y:50};
    index++;

    svgDrawPath(stencilPoints);
}

function svgDrawScale() {
    svgDrawLine(50, 50, 100, 100);
}

/*****************************************************************************
 * Profile calculation
 *****************************************************************************/
/* Origo in skate middle point (mm) */
function calculateRadius(x) {
    var y;

    var skateSize = skateBlades[skateBladeIndex].size;

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

    return y;
}


function calculateProfile() {
    var skateSize = skateBlades[skateBladeIndex].size;

    profilePoints = [];

    /* Initialize points */
    var index = 0;
    for (let x = -skateSize / 2.0; x < skateSize / 2.0; x += profileStep) {
        profilePoints[index] = {x:x, y:0};
        index++;
    }

    /* Calculate pivot point */
    var pivotIndex = (skateSize / 2.0) / profileStep;
    profilePoints[pivotIndex].y = 0;

    /* Calculate right profile */
    for (let i = pivotIndex + 1; i < profilePoints.length; i++) {
        profilePoints[i].y = profilePoints[i - 1].y + calculateRadius(profilePoints[i].x) * 0.1;
        index++;
    }

    /* Calculate left profile */
    for (let i = pivotIndex - 1; i >= 0; i--) {
        profilePoints[i].y = profilePoints[i + 1].y + calculateRadius(profilePoints[i].x) * 0.1;
        index++;
    }
}

/*****************************************************************************
 * Stencil draw
 *****************************************************************************/
function uiRedrawStencil() {

    svgWidth  = parseFloat(stencilSvg.getAttribute("width")); /* mm */
    svgHeight = parseFloat(stencilSvg.getAttribute("height")); /* mm */

    var skateSize = skateBlades[skateBladeIndex].size;

    /* Draw stencil path */
    svgContent = "";
    var name = document.getElementById("profile-name").value;
    name = name.replace(/</g, "&lt;");
    name = name.replace(/>/g, "&gt;");
    name = name.replace(/"/g, "&quot;");
    name = name.replace(/'/g, "&#39;");
    svgDrawText(name, svgWidth / 2, 20);
    svgDrawText(document.getElementById("fingerprint").value, svgWidth / 2,  40);
    svgDrawScale();
    svgDrawOutline();
    stencilSvg.innerHTML = svgContent;
}

