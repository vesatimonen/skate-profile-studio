
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
        if (skateBladeSize == skateBlades[blade].size) {
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
        if (skateBladeSize == skateBlades[blade].size) {
            newButton.className = "button button-selected";
        } else {
            newButton.className = "button";
        }
        newButton.id        = "button-" + blade;
        newButton.innerHTML = skateBlades[blade].size;
        newButton.sizeIndex = blade;
        sizeButtons.appendChild(newButton);
    }
}

/*****************************************************************************
 * Button handlers
 *****************************************************************************/
function uiSave(event) {
    var aaa = "sfsdfsdfsdfsdfsdfsf";
    save(aaa, "test.tst", "text/plain");

    return false;
}

/*****************************************************************************
 * Register button event handlers
 *****************************************************************************/
document.getElementById("button-save").addEventListener("click",    uiSave);



function testtest(event) {
    console.log(event.target.sizeIndex);
    skateBladeSize = event.target.sizeIndex;
    uiRedrawSizeButtons();
}
// window.addEventListener("click",  testtest);
document.getElementById("size-buttons").addEventListener("click",  testtest);
