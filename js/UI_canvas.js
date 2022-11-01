/*****************************************************************************
 * Canvas helpers
 *****************************************************************************/
function uiInitCanvas(canvas, width, height) {
    const pixelRation = 1.0;
    canvas.width  = width  * pixelRation;
    canvas.height = height * pixelRation;
    controlContext.scale(pixelRation, pixelRation);
}



// Function to download data to a file

//document.getElementById("debug-text").innerHTML = window.innerWidth;

/*
const link = document.querySelector('a.simple');

const saveBtn = document.querySelector('button.save-file');

let name = 'Monty';

let text = `My name in ${name}.I love writing tutorials.`;

var textBlob = new Blob([text], {type: 'text/plain'});

link.setAttribute('href', window.URL.createObjectURL(textBlob));

link.setAttribute('download', `${name.toLowerCase()}.txt`);


saveBtn.addEventListener('click', function(){

  var tempLink = document.createElement("a");

  let textArea = document.querySelector("textarea");

  var taBlob = new Blob([textArea.value], {type: 'text/plain'});

  tempLink.setAttribute('href', URL.createObjectURL(taBlob));

  tempLink.setAttribute('download', `${name.toLowerCase()}.txt`);

  tempLink.click();

  URL.revokeObjectURL(tempLink.href);

});
*/
