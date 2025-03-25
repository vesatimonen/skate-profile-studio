

/*****************************************************************************
 * Button handlers
 *****************************************************************************/
function uiSizeButton(event) {
//    skateBladeIndex = event.target.sizeIndex;
    uiRedrawControls();
    uiRedrawTemplate();
}


function uiExportSVG() {
    var fileData = new Blob([templateSvg.outerHTML], {type: "text/plain"});
    var fileBlob = document.getElementById("export-profile");

    fileBlob.href     = URL.createObjectURL(fileData);
    fileBlob.download = document.getElementById("profile-name").value + ".svg";
}

function uiExportDataPointsTxt() {
    /* Format data */
    const points = dataPoints.map(obj =>
        Object.values(obj).map(value => typeof value === 'number' ? value.toFixed(6) : value)
                                 );

    /* Create comma separated content */
    const csvContent = points.map(obj => Object.values(obj).join(" ")).join("\n");

    /* Download file */
    var fileData = new Blob([csvContent], {type: "text/plain"});
    var fileBlob = document.getElementById("export-profile");
    fileBlob.href     = URL.createObjectURL(fileData);
    fileBlob.download = document.getElementById("profile-name").value + ".txt";
}

function uiExport() {

    var profileType = document.getElementById("profile-type").value;
    switch (profileType) {
        case "data-points-txt":
            uiExportDataPointsTxt();
            break;
        default:
            uiExportSVG();
            break;
    }
}


/*****************************************************************************
 * Register button event handlers
 *****************************************************************************/
document.getElementById("export-profile").addEventListener("click",  uiExport);
