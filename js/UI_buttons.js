

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

    let profileDataPoints = [
        {x: 1.3, y: 2.0},
        {x: 2.0, y: 4.0},
        {x: 3.0, y: 6.0}
    ];

    console.log(templatePoints);

    const csvContent = profileDataPoints.map(obj => Object.values(obj).join(" ")).join("\n");
    console.log(csvContent);


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
