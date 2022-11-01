
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

function uiRestart(event) {
    return false;
}

/*****************************************************************************
 * Register button event handlers
 *****************************************************************************/
document.getElementById("button-save").addEventListener("click",    uiSave);
document.getElementById("button-restart").addEventListener("click", uiRestart);

