const skateBlades = [
    {size: 221},
    {size: 230},
    {size: 238},
    {size: 245},
    {size: 254},
    {size: 263},
    {size: 272},
    {size: 280},
    {size: 288},
    {size: 296},
    {size: 306},
];
//var skateBladeIndex = 6;
var skateEffectiveLength = 0.35;
var skateBladeSize = 294;

uiInitControls();

function parseOptions() {
    /* Get URL */
    const url = new URL(window.location.href);

    /* Parse fingerprint argument */
    const fingerprint = url.searchParams.get("fingerprint");
    if (fingerprint != null) {
         document.getElementById("fingerprint").value = fingerprint;
         uiFingerprintChange();
    }

    /* Parse mode argument */
//    const mode = url.searchParams.get("mode");
//    if (mode != null) {
//    }
}

window.onload = function () {
    /* Parse options */
    parseOptions();
}




