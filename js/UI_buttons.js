

/*****************************************************************************
 * Size button functions
 *****************************************************************************/
const sizeButtons = document.getElementById("size-buttons");

function uiRedrawSizeButtons() {
    for (let blade = 0; blade < skateBlades.length; blade++) {
        var button = document.getElementById("button-" + blade);
        if (skateBladeSize == skateBlades[blade].size) {
            button.className = "button button-selected";
        } else {
            button.className = "button";
        }
    }
}

function uiInitSizeButtons() {
    /* Delete existing buttons */
    while (sizeButtons.firstChild) {
        sizeButtons.removeChild(sizeButtons.firstChild);
    }

    /* Create size buttons */
    for (let blade = 0; blade < skateBlades.length; blade++) {
        let newButton = document.createElement("button");
        newButton.className = "button";
        newButton.id        = "button-" + blade;
        newButton.innerHTML = skateBlades[blade].size;
        newButton.sizeIndex = blade;
        sizeButtons.appendChild(newButton);
    }

//    uiRedrawSizeButtons();
}

/*****************************************************************************
 * Button handlers
 *****************************************************************************/
function uiSizeButton(event) {
//    skateBladeIndex = event.target.sizeIndex;
//    uiRedrawSizeButtons();
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
    var fileData = new Blob([templateSvg.outerHTML], {type: "text/plain"});
    var fileBlob = document.getElementById("export-profile");

    fileBlob.href     = URL.createObjectURL(fileData);
    fileBlob.download = document.getElementById("profile-name").value + ".svg";
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
document.getElementById("size-buttons").addEventListener("click",  uiSizeButton);
document.getElementById("export-profile").addEventListener("click",  uiExport);
