const skateBlades = [
    {size: 221, effectiveLength: 65},
    {size: 230, effectiveLength: 70},
    {size: 238, effectiveLength: 75},
    {size: 245, effectiveLength: 80},
    {size: 254, effectiveLength: 85},
    {size: 263, effectiveLength: 90},
    {size: 272, effectiveLength: 95},
    {size: 280, effectiveLength: 100},
    {size: 288, effectiveLength: 105},
    {size: 296, effectiveLength: 110},
    {size: 306, effectiveLength: 115},
];
var skateBladeIndex = 6;


uiInitControls();
//uiInitSizeButtons();


const skateImage   = document.getElementById('skate-image');
const imageCanvas  = document.getElementById("image-canvas");
const imageContext = imageCanvas.getContext('2d');

//skateImage.src = URL.createObjectURL("images/icon.png");
//skateImage.crossOrigin = "Anonymous";
skateImage.src = "images/test.jpg";


skateImage.onload = function () {
    imageCanvas.width = this.width;
    imageCanvas.height = this.height;

    imageCanvas.width = 400;
    imageCanvas.height = 400;

    var hRatio = imageCanvas.width  / skateImage.width;
    var vRatio = imageCanvas.height / skateImage.height;
    var ratio  = Math.min(hRatio, vRatio);
    var centerShift_x = ( imageCanvas.width  - skateImage.width * ratio ) / 2;
    var centerShift_y = ( imageCanvas.height - skateImage.height * ratio ) / 2;

    imageContext.drawImage(skateImage, 0, 0, skateImage.width, skateImage.height,                                           // Source rectangle
                                       centerShift_x,centerShift_y, skateImage.width * ratio, skateImage.height * ratio);   // Target rectangle

    imageContext.beginPath();
    imageContext.moveTo(0, 0);
    imageContext.lineTo(400, 400);
    imageContext.fillStyle   = "none";
    imageContext.lineWidth   = 2;
    imageContext.lineCap     = "round";
    imageContext.strokeStyle = "#FF0000";
    imageContext.stroke();

    let surface = imageContext.getImageData(0, 0, imageCanvas.width, imageCanvas.height);

    for (let y = 0; y != surface.height; y++) {
      for (let x = 0; x != surface.width / 2; x++) {
        /* Calculate index */
        let i = (y * surface.width + x) * 4;

        /* Average of RGB value */
        let intensity = (surface.data[i + 0] + surface.data[i + 1] + surface.data[i + 2]) / 3;

        surface.data[i + 0] = 255 - intensity;
        surface.data[i + 1] = 255 - intensity;
        surface.data[i + 2] = 255 - intensity;
      }
    }

    imageContext.putImageData(surface, 0, 0);

//    let url = imageCanvas.toDataURL();
//    skateImage.src = url;

};






