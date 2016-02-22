(function() { 
  var canvasNode = document.getElementById('canvas');
  var context = canvasNode.getContext('2d');
  var firstImageInput = document.getElementById('first-image');

  var secondImageInput = document.getElementById('second-image');

  var switchButton = document.getElementById('switch-button');

  var downloadButton = document.getElementById('download-button');

  var firstImage = new Image();
  var secondImage = new Image();

  function updateCanvas() {
    // Clear the canvas and re-draw our elements.
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#FFFFFF";

    if (!!firstImage.src) {
      drawFirstImage();
    }

    if (!!secondImage.src) {
      drawSecondImage();
    }

    drawWatermark();
  }

  function drawWatermark() {
    context.save();
    context.fillStyle = "#FFF";
    context.font = "24px sans-serif";
    context.globalAlpha = 0.8;
    var text = context.measureText('http://fade.pics');
    context.fillText("http://fade.pics", 590-text.width, 590);
    context.strokeText("http://fade.pics", 590-text.width, 590);
    context.restore();
  }

  function drawFirstImage() {
    // Draw First iMage, regular opacity
    context.save();
    context.drawImage(firstImage, 0, 0, 295, 295);

    // Draw Top Right Image, 25% opacity.
    context.globalAlpha = 0.75;
    context.drawImage(firstImage, 305, 0, 295, 295);
    // Draw Bottom Right Image, 50% opacity.
    context.globalAlpha = 0.50;
    context.drawImage(firstImage, 0, 305, 295, 295);
    context.restore(); 
  }

  function drawSecondImage() {
    context.save();
    // Bottom Right Image, 1 opacity.
    context.drawImage(secondImage, 305, 305, 295, 295);
    // Top Right Image, 0.50 opacity;
    context.globalAlpha = 0.25;
    context.drawImage(secondImage, 305, 0, 295, 295);
    // Bottom Left Image, 0.5
    context.globalAlpha = 0.50;
    context.drawImage(secondImage, 0, 305, 295, 295);
    context.restore();  
  }

  function handleImageChange(imageObj, evt) {  
    var files  = evt.target.files;
    var firstFile = files[0];  

    var reader = new FileReader();

    reader.onload = (function(img) {
      // When a file is read, we want to update the source of the image object.
      return function(e) {
        var imageFile = e.target.result;
        // Set the image object's source to this
        imageObj.src = imageFile;
      }
    })(firstFile);  
    reader.readAsDataURL(firstFile);
  }

  function switchImages() {
    var firstImageCopy = firstImage.cloneNode();
    var secondImageCopy = secondImage.cloneNode();

    var firstInputCopy = firstImageInput.cloneNode();
    var secondInputCopy = secondImageInput.cloneNode();
    firstImage = secondImageCopy;
    secondImage = firstImageCopy;
    updateCanvas();
    initialize();
  }

  function downloadCanvas(evt) {
    downloadButton.href = canvasNode.toDataURL();
    downloadButton.download = 'fading-meme.png';
  }

  function initialize() {
    firstImageInput.addEventListener('change', handleImageChange.bind(this, firstImage));

    secondImageInput.addEventListener('change', handleImageChange.bind(this, secondImage));
    switchButton.addEventListener('click', switchImages);
    firstImage.onload = updateCanvas;
    secondImage.onload = updateCanvas;
  }

  function loadDefaults() {
    firstImage.src = "http://cp91279.biography.com/1000509261001/1000509261001_1630293503001_BIO-Biography-Adolf-Hitler-SF.jpg";
    secondImage.src = "http://i2.cdn.turner.com/cnnnext/dam/assets/160118134132-donald-trump-nigel-parry-large-169.jpg";
  }

  initialize();
  loadDefaults();
})();
