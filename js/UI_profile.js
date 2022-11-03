const stencilSvg = document.getElementById("stencil-svg");

var stencilPoints = [];


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

function calculateStencil() {
    stencilPoints = [];

    stencilPoints[0] = {x:0, y:10.0};
    stencilPoints[1] = {x:120 , y:100.0};
/*
    var skateSize = skateBlades[skateBladeIndex].size;
    var index = 0;
    for (let x = 0; x < skateSize / 2.0; x += 1.0) {
        stencilPoints[index] = {x:x, y:10.0};
        index++;
    }
*/
}

function svgDrawPath(points) {

    var svgContent = "";

    /* Create svg content */
    svgContent += "\n";
    svgContent += "  <polyline\n";
    svgContent += "    points='\n";
    for (let i = 0; i < points.length; i++) {
        svgContent += "      " + points[i].x + ", " + points[i].y + "\n";
    }
    svgContent += "    '\n";
    svgContent += "    stroke='black' stroke-width='0.1'\n";
    svgContent += "  />\n";

    /* Draw svg */
    stencilSvg.innerHTML = svgContent;

console.log(stencilSvg.outerHTML);

//    stencilSvg.innerHTML = "<circle cx='" + (50 + 3 * sliderValues[1]) + "' cy='" + (50 - 3 * sliderValues[2]) + "' r='" + 3 * sliderValues[0] + "' stroke='green' stroke-width='4' fill='yellow' />";

}

function calculateProfile() {
}


function uiRedrawProfile() {

    calculateStencil();
    svgDrawPath(stencilPoints);

//console.log(calculateRadius(150));


}
