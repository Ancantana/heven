let bgImage;
let textInput;
let galleryVisible = false;
let galleryImages = [];
let plusButton, downloadButton;
let selectedImage = null;
let offsetX, offsetY;

function preload() {
  bgImage = loadImage('AFTERLIFE.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textInput = createInput('');
  textInput.position(width / 2 - textInput.width / 2, height / 2);

  let textColorPicker = createColorPicker('#000000');
  textColorPicker.position(20, 20);
  textColorPicker.input(() => {
    textInput.style('color', textColorPicker.value());
  });

  let bgColorPicker = createColorPicker('#ffffff');
  bgColorPicker.position(20, 50);
  bgColorPicker.input(() => {
    textInput.style('background-color', bgColorPicker.value());
  });

  plusButton = createImg('plusbutton.png', 'plus button');
  plusButton.position(20, 80);
  plusButton.size(30, 30);
  plusButton.mousePressed(toggleGallery);

  downloadButton = createImg('heaveanangel.png', 'download button');
  downloadButton.position(20, 120);
  downloadButton.size(30, 30);
  downloadButton.mousePressed(() => saveCanvas('myCanvas', 'png'));

  initGallery();
}

function draw() {
  if (bgImage) {
    background(bgImage);
  }

  if (galleryVisible) {
    drawGallery();
  }
}

function initGallery() {
  let imgUrls = ['original_4c5b0b58e719a301686f3adc01789887.png', 'original_4c5b0b58e719a301686f3adc01789887.png', 'original_4c5b0b58e719a301686f3adc01789887.png'];
  imgUrls.forEach(url => {
    let img = createImg(url, 'image');
    img.hide();
    galleryImages.push(img);
  });
}

function toggleGallery() {
  galleryVisible = !galleryVisible;
  galleryImages.forEach(img => {
    if (galleryVisible) {
      img.show();
      img.size(100, 100); // Fit images within the gallery
      img.position(width - 320, galleryImages.indexOf(img) * 110 + 10);
    } else {
      img.hide();
    }
  });
}

function drawGallery() {
  if (galleryVisible) {
    fill(255);
    rect(width - 330, 0, 327, 344);
  }
}

function mousePressed() {
  if (dist(mouseX, mouseY, 20, 80) < 15) {
    toggleGallery();
  } else {
    galleryImages.forEach(img => {
      let imgX = img.position().x;
      let imgY = img.position().y;
      let imgW = img.width;
      let imgH = img.height;
      if (mouseX >= imgX && mouseX <= imgX + imgW && mouseY >= imgY && mouseY <= imgY + imgH) {
        selectedImage = img;
        offsetX = mouseX - imgX;
        offsetY = mouseY - imgY;
        img.dragging = true;
      }
    });
  }
}

function mouseDragged() {
  if (selectedImage && selectedImage.dragging) {
    selectedImage.position(mouseX - offsetX, mouseY - offsetY);
  }
}

function mouseReleased() {
  if (selectedImage) {
    selectedImage.dragging = false;
    selectedImage = null;
  }
}
