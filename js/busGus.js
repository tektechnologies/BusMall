'use strict';

var nextImage = 0;
function displayImages() {
  // Display image1
  var image1 = Placeholder.all[nextImage++];
 
  var img1 = document.getElementById('product-1');
  img1.src = image1.src;
  img1.currentPlaceholder = image1;

  var image2 = Placeholder.all[nextImage++];
  console.log(image2);
  var img2 = document.getElementById('product-2');
  img2.src = image2.src;
  img2.currentPlaceholder = image2;

  var image3 = Placeholder.all[nextImage++];
  console.log(image2);
  var img3 = document.getElementById('product-3');
  img3.src = image3.src;
  img3.currentPlaceholder = image3;
}

var productImages = document.querySelectorAll('#voting img');
for(var i = 0; i < productImages.length; i++) {
  productImages[i].addEventListener('click', function (event) {
    console.log('click', event.target.currentPlaceholder);

    displayImages();
  });
}

function Placeholder(name, src) {
  this.name = name;
  this.src = src;

  Placeholder.all.push(this);
}
Placeholder.all = [];

new Placeholder('', '');
new Placeholder('', '');
new Placeholder('', '');
new Placeholder('', '');

console.log('Voting Images', Placeholder.all);

window.addEventListener('load', displayImages);