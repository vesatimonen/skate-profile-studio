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
uiInitSizeButtons();




const skateImage   = document.getElementById('skate-image');
const imageCanvas  = document.getElementById("image-canvas");
const imageContext = imageCanvas.getContext('2d');

//skateImage.src = URL.createObjectURL("images/icon.png");
skateImage.src = "images/test.jpg";


skateImage.onload = function () {
    imageCanvas.width = this.width;
    imageCanvas.height = this.height;
    imageCanvas.crossOrigin = "anonymous";

imageCanvas.width = 300;
imageCanvas.height = 300;

    var hRatio = imageCanvas.width  / skateImage.width;
    var vRatio = imageCanvas.height / skateImage.height;
    var ratio  = Math.min(hRatio, vRatio);
    var centerShift_x = ( imageCanvas.width  - skateImage.width * ratio ) / 2;
    var centerShift_y = ( imageCanvas.height - skateImage.height * ratio ) / 2;
    imageContext.drawImage(skateImage, 0, 0, skateImage.width, skateImage.height,                                           // Source rectangle
                                       centerShift_x,centerShift_y, skateImage.width * ratio, skateImage.height * ratio);   // Target rectangle


    imageContext.beginPath();
    imageContext.moveTo(0, 0);
    imageContext.lineTo(200, 200);
    imageContext.fillStyle   = "none";
    imageContext.lineWidth   = 2;
    imageContext.lineCap     = "round";
    imageContext.strokeStyle = "#303030";
    imageContext.stroke();
};







