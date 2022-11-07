
function save(data, filename, type) {
    var fileData = new Blob([data], {type: type});
    var fileBlob = document.getElementById("file-save");

    fileBlob.href     = URL.createObjectURL(fileData);
    fileBlob.download = filename;
    fileBlob.click();
}


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
    /* Create size buttons */
    for (let blade = 0; blade < skateBlades.length; blade++) {
        let newButton = document.createElement("button");
        newButton.className = "button";
        newButton.id        = "button-" + blade;
        newButton.innerHTML = skateBlades[blade].size;
        newButton.sizeIndex = blade;
        sizeButtons.appendChild(newButton);
    }

    uiRedrawSizeButtons();
}

/*****************************************************************************
 * Button handlers
 *****************************************************************************/
function uiExport(event) {
    save(stencilSvg.outerHTML, document.getElementById("profile-name").value + ".svg", "text/plain");

    return false;
}

function uiSizeButton(event) {
    skateBladeIndex = event.target.sizeIndex;
    uiRedrawSizeButtons();
    uiRedrawControls();
    uiRedrawStencil();
}

/*****************************************************************************
 * Register button event handlers
 *****************************************************************************/
document.getElementById("button-export").addEventListener("click", uiExport);
document.getElementById("size-buttons").addEventListener("click",  uiSizeButton);
