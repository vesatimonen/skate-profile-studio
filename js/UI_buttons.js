
function save(data, filename, type) {
    var fileData = new Blob([data], {type: type});
    var fileBlob = document.getElementById("file-save");

    fileBlob.href     = URL.createObjectURL(fileData);
    fileBlob.download = filename;
    fileBlob.click();
}

/*****************************************************************************
 * Button handlers
 *****************************************************************************/
function uiSave(event) {
    var aaa = "sfsdfsdfsdfsdfsdfsf";
    save(aaa, "test.tst", "text/plain");

    return false;
}

const sizeButtons = document.getElementById("size-buttons");
function uiInitSizeButtons() {
    /* Create size buttons */
    for (let blade = 0; blade < skateBlades.length; blade++) {
        let newButton = document.createElement("button");
        if (skateBladeSize == skateBlades[blade].size) {
            newButton.className = "button button-selected";
        } else {
            newButton.className = "button";
        }
        newButton.innerHTML = skateBlades[blade].size;
        sizeButtons.appendChild(newButton);
    }
}

/*****************************************************************************
 * Register button event handlers
 *****************************************************************************/
document.getElementById("button-save").addEventListener("click",    uiSave);

