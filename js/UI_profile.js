
var stencilPoints = [];
var profilePoints = [];


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


}


function uiRedrawProfile() {
    const svg = document.getElementById("profile-svg");

    stencilPoints = [];
console.log(calculateRadius(150));

    svg.innerHTML = "<circle cx='" + (50 + 3 * sliderValues[1]) + "' cy='" + (50 - 3 * sliderValues[2]) + "' r='" + 3 * sliderValues[0] + "' stroke='green' stroke-width='4' fill='yellow' />";

}
