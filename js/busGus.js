/*globals Chart*/
'use strict';


window.addEventListener('load', function onLoad(){
  loadFromStorage();

  if(Placeholder.all.length === 0){
    initialize();
  }
  displayImages();
});

// Local Storage
function saveAll() {
  localStorage['voteHistory'] = JSON.stringify({voteCount: Placeholder.voteCount});
  localStorage['placeholders'] = JSON.stringify(Placeholder.all);
//console.log(localStorage);
}

function loadFromStorage(){
  var jsonVoteHistoryString = localStorage['voteHistory'];
  if(jsonVoteHistoryString){
    var voteHistory = JSON.parse(jsonVoteHistoryString);
    Placeholder.voteCount = voteHistory.voteCount;
    //console.log('Setting voteCount to ' + Placeholder.voteCount);
  }
  var jsonStringFromStorage = localStorage['placeholders'];
  if(!jsonStringFromStorage)
    return;

  Placeholder.all = [];
  var arrayFromStorage = JSON.parse(jsonStringFromStorage);
  for(var i = 0; i < arrayFromStorage.length; i ++){
    var arrayItem = arrayFromStorage[i];
    new Placeholder(arrayItem.name, arrayItem.src, arrayItem.showCount, arrayItem.voteCount);
  }
  console.log('fromStorage', Placeholder.all);
}
//get next image for display, TODO: randomize those bits.

function getNextImage(){
  var nextIndex = Math.floor(Math.random() * Placeholder.all.length);
  var image = Placeholder.all[nextIndex];
  console.log(image.src);
  return image;
}

/////////////////////////////////
// for (var i = 0; i < Placeholder.all.length; i++) {
//   Placeholder.all[i].voteCount = Math.floor(5 + Math.random() * 500);
//   Placeholder.all[i].showCount = Math.floor(20 + Math.random() * 1000);
// }

// //////////////////////////////

// function getRandomImage(){
//   var nextIndex = Math.floor(Math.random() * Placeholder.all.length);
//   var image = Placeholder.all[nextIndex];

//   return image;
// }
// var randImg1 = getRandomImage();
// imageOne.src = randImg1.src
// randImg1.timesViewed += 1;

// var clickContainer = document.getElementById('clickContainer');
// if(event.target.tagName !== 'IMG'){
// //ignore click.
//   return;
// }
// voteCount++;
// if (voteCount > maxVotes){
//   return;
// }

// document.body.addEventListener('click', function(event)){
//   console.log('click', {target: event.target, currentTarget})
// });
// //3 steps
// // set image source, save current image on the img object, track that image has been viewed
// imageOne.src = randImg1.src
// randImg1.timesViewed += 1;

// while(randImage1 === randImage2){
//   randImage2 = getRandomImage();
// }
// while(randImage3 === randImage1 || randImage3 === randImage2){
//   randImage3 = getRandomImage();
// }

// do {
//   var randImg3 = getRandomImage();
// } while (lastViewed.randImage3 === randImage1 || randImage3 === randImage2);


// //global array

// var lastView = [];

// //reset last viewed.
// var lastView = [];
// lastViewed.push(randImg1);
// lastViewed.push(randImg2);

// if(lastViewed.length > 3){
//   lastViewed.splice(0,3);
//   //remove first three images of array
// }


//todays notes from classs.







/////////////////////////////

//display the next images.
function displayImages() {
  if(Placeholder.voteCount >= 5) {
  //console.log('Display results now!')
    showResults();
    return;
  }

  document.getElementById('resultsWrapper').style.display = 'none';

  // Display image1
  var image1 = getNextImage();
  image1.showCount++;
  var img1 = document.getElementById('product-1');
  img1.src = image1.src;
  //Save the current image so we can update its vote count.
  img1.currentPlaceholder = image1;
  //Track that image1 was shown

  //Display image 2
  var image2 = getNextImage();
  var img2 = document.getElementById('product-2');
  img2.src = image2.src;
  img2.currentPlaceholder = image2;
  //Todo: track that image2 was shown.


  var image3 = getNextImage();
  var img3 = document.getElementById('product-3');
  img3.src = image3.src;
  img3.currentPlaceholder = image3;
  //Todo: track that image2 was shown.
}

var productImages = document.querySelectorAll('#voting img');
for(var i = 0; i < productImages.length; i++) {
  productImages[i].addEventListener('click', function (event) {
    Placeholder.voteCount++;
    event.target.currentPlaceholder.voteCount++;
    saveAll();
    //After vote, replace images for new vote
    displayImages();
  });
}

function Placeholder(name, src, testShowCount, testVoteCount) {
  this.name = name;
  this.src = src;
  //If no testShowCount or testVoteCount count was given, use zero;
  this.showCount = testShowCount || 0;
  this.voteCount = testVoteCount || 0;
  //Add this instance to our catalog of placeholders
  Placeholder.all.push(this);
}


function initialize(){
  Placeholder.voteCount = 0;
  Placeholder.all = [];

  new Placeholder('R2D2 bag', 'images/bag.jpg');
  new Placeholder('Thats Bannanas', 'images/banana.jpg');
  new Placeholder('iBathroom', 'images/bathroom.jpg');
  new Placeholder('BoostyBussin', 'images/boots.jpg');
  new Placeholder('BreakFast Box', 'images/breakfast.jpg');
  new Placeholder('Nope', 'images/bubblegum.jpg');
  new Placeholder('EagerChairin', 'images/chair.jpg');
  new Placeholder('They\'re Here', 'images/cthulhu.jpg');
  new Placeholder('Plata-Doggie', 'images/dog-duck.jpg');
  new Placeholder('Dragon4Dinner', 'images/dragon.jpg');
  new Placeholder('Pen Plate', 'images/pen.jpg');
  new Placeholder('PetSweep', 'images/pet-sweep.jpg');
  new Placeholder('Pizscissors-A', 'images/scissors.jpg');
  new Placeholder('SharkSleep', 'images/shark.jpg');
  new Placeholder('Baby Clean', 'images/sweep.jpg');
  new Placeholder('Hoth Cloth', 'images/tauntaun.jpg');
  new Placeholder('Uni-Spam', 'images/unicorn.jpg');
  new Placeholder('Tail TeraByte', 'images/usb.jpg');
  new Placeholder('Water Me', 'images/water-can.jpg');
  new Placeholder('wine-glass', 'images/wine-glass.jpg');

  console.log('Voting Images', Placeholder.all);

  saveAll();
}

//console.log('All PlaceHolder:  ', Placeholder.all);
//show current results
function showResults(){
  document.getElementById('resultsWrapper').style.display = 'block';
  var ul = document.getElementById('results');
  //reset list
  ul.innerHTML = '';
  //for each placholder image...
  for(var i = 0; i < Placeholder.all.length; i++){
    var current = Placeholder.all[i];
    //add to <ul id="results">
    var li = document.createElement('li');
    li.textContent = current.name + ' got ' + current.voteCount + ' votes';
    ul.appendChild(li);
  }
  showResultChart();
}

////////////////////////////////
//This starts the Canvas js ///
function showResultChart(){
  var canvas = document.getElementById('resultsCanvas');

  //Un-hide our Canvas
  canvas.style.display = 'block';

  var labels = [];
  var voteCounts = [];
  var showCounts = [];
  var votePercentage = [];

  for(var i = 0; i < Placeholder.all.length; i++){
    labels[i] = Placeholder.all[i].name;
    voteCounts[i] = Placeholder.all[i].voteCount;
    showCounts[i] = Placeholder.all[i].showCount;
    //calculates % of times image got votes out of all times shown.
    votePercentage[i] = 100 * voteCounts[i] / showCounts[i];

  }

  var ctx = canvas.msGetInputContext('2d');

  new Chart(ctx, {
    type: 'bar',

    data: {
      labels: labels,
      datasets: [
        {
          label: 'Vote Count',
          backgroundColor: 'rgb(200,0,0,0.6)',
          data: voteCounts
        },
        {
          label:'Show Count',
          backgroundColor: 'rgb(0,0,200,0.4)',
          data: showCounts
        },
        {
          label: 'Vote %',
          data: votePercentage
        }
      ]
    },
    options:{
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }
        ]
      },
      title: {
        display: true,
        text: 'Voting Results'
      }
    }
  });
}


var resetButton = document.querySelector('button[type="reset"]');
resetButton.addEventListener('click', function resetClick(event){
  console.log('reset click', event);
  initialize();
  displayImages();
});
