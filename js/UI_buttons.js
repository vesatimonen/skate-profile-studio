

/*****************************************************************************
 * Size button functions
 *****************************************************************************/
const sizeButtons = document.getElementById("size-buttons");

function uiRedrawSizeButtons() {
    for (let blade = 0; blade < skateBlades.length; blade++) {
        var button = document.getElementById("button-" + blade);
        if (skateBlades[skateBladeIndex].size == skateBlades[blade].size) {
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
    skateBladeIndex = event.target.sizeIndex;
//    uiRedrawSizeButtons();
    uiRedrawControls();
    uiRedrawStencil();
}

function uiExport() {
    var fileData = new Blob([stencilSvg.outerHTML], {type: "text/plain"});
    var fileBlob = document.getElementById("export-svg");

    fileBlob.href     = URL.createObjectURL(fileData);
    fileBlob.download = document.getElementById("profile-name").value + ".svg";
}


/*****************************************************************************
 * Register button event handlers
 *****************************************************************************/
document.getElementById("size-buttons").addEventListener("click",  uiSizeButton);
document.getElementById("export-svg").addEventListener("click",  uiExport);
