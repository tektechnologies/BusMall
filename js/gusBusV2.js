///*globals Chart*/
'use strict';



//////////////////////////////////////////////////
//SETS PLACEHOLDER TO 0 CALLS INITIALIZE() THEN DISPLAYS IMAGES
// window.addEventListener('load', function onLoad(){
//   loadFromStorage();
//   if(Placeholder.all.length === 0){
//     initialize();
//   }
//   displayImages();
// });
//////////////////////////////////////////////////



///////////////////////////////////////////////////
//LOCAL STORAGE
///////////////////////////////////////////////////
// Local Storage
// function saveAll() {
//   localStorage['voteHistory'] = JSON.stringify({voteCount: Placeholder.voteCount});
//   localStorage['placeholders'] = JSON.stringify(Placeholder.all);
// //console.log(localStorage);
// }

// function loadFromStorage(){
//   var jsonVoteHistoryString = localStorage['voteHistory'];
//   if(jsonVoteHistoryString){
//     var voteHistory = JSON.parse(jsonVoteHistoryString);
//     Placeholder.voteCount = voteHistory.voteCount;
//     //console.log('Setting voteCount to ' + Placeholder.voteCount);
//   }
//   var jsonStringFromStorage = localStorage['placeholders'];
//   if(!jsonStringFromStorage)
//     return;

//   Placeholder.all = [];
//   var arrayFromStorage = JSON.parse(jsonStringFromStorage);
//   for(var i = 0; i < arrayFromStorage.length; i ++){
//     var arrayItem = arrayFromStorage[i];
//     new Placeholder(arrayItem.name, arrayItem.src, arrayItem.showCount, arrayItem.voteCount);
//   }
//   console.log('fromStorage', Placeholder.all);
// }
/////////////////////////////////////////////////////
//END LOCAL STORAGE
////////////////////////////////////////////////////






var maxVotes = 25;
var voteCount = 0;


var lastViewed = [];

function getRandomImage(){
  var nextIndex = Math.floor(Math.random() * Placeholder.all.length);
  return Placeholder.all[nextIndex];
}


function displayImages(){
  var img1 = document.getElementById('product-1');
  var img2 = document.getElementById('product-2');
  var img3 = document.getElementById('product-3');


  var randomImage1 = getRandomImage();
  while (lastViewed.includes(randomImage1));{
    randomImage1 = getRandomImage();
  }
  lastViewed.push(randomImage1);


  var randomImage2 = getRandomImage();
  while (lastViewed.includes(randomImage2)){
    randomImage2 = getRandomImage();
  }
  lastViewed.push(randomImage2);


  var randomImage3 = getRandomImage();
  while (lastViewed.includes(randomImage3)){
    randomImage3 = getRandomImage();
  }
  lastViewed.push(randomImage3);

  if (lastViewed.length > 3){
    lastViewed.splice(0, 3);
  }


  img1.src = randomImage1.src;
  img2.src = randomImage2.src;
  img3.src = randomImage3.src;

  img1.currentImage = randomImage1;
  img2.currentImage = randomImage2;
  img3.currentImage = randomImage3;

  randomImage1.timesViewed += 1;
  randomImage2.timesViewed += 1;
  randomImage3.timesViewed += 1;


  console.log(Placeholder.all);
  
}

var clickContainer = document.getElementById('click-container');

clickContainer.addEventListener('click', function (event) {
  console.log(event.target.tagName);
  console.log('Ignore Clicks that are not images');
  if (event.target.tagName !== 'IMG'){
    return;
  }
  voteCount++;
  if(voteCount > maxVotes){
    //showResults();
    return;
  }
  //.log('click number' + voteCount);

  //console.log('click', {target: event.target, currentTarget: event.currentTarget});


  var currentImage = event.target.currentImage;
  // add click for the image selected.
  currentImage.timesClicked++;

  displayImages();
});












/////////////////////////////////////////////////////////////
//get next image for display, TODO: randomize those bits.
/////////////////////////////////////////////////////////////
// function getNextImage(){
//   var nextIndex = Math.floor(Math.random() * Placeholder.all.length);
//   var image = Placeholder.all[nextIndex];
//   console.log(image.src);
//   return image;
// }

// //display the next images.
// function displayImages() {
//   if(Placeholder.voteCount >= 25) {
//   //console.log('Display results now!')
//     showResults();
//     return;
//   }
//   //HIDES THE RESULTS WRAPPER
//   document.getElementById('resultsWrapper').style.display = 'none';

//   // Display image1
//   var image1 = getNextImage();
//   image1.showCount++;
//   var img1 = document.getElementById('product-1');
//   img1.src = image1.src;
//   //Save the current image so we can update its vote count.
//   img1.currentPlaceholder = image1;
//   //Track that image1 was shown

//   //Display image 2
//   var image2 = getNextImage();
//   var img2 = document.getElementById('product-2');
//   img2.src = image2.src;
//   img2.currentPlaceholder = image2;
//   //Todo: track that image2 was shown.


//   var image3 = getNextImage();
//   var img3 = document.getElementById('product-3');
//   img3.src = image3.src;
//   img3.currentPlaceholder = image3;
//   //Todo: track that image2 was shown.
// }

// var productImages = document.querySelectorAll('#voting img');
// for(var i = 0; i < productImages.length; i++){
//   productImages[i].addEventListener('click', function (event) {
//     Placeholder.voteCount++;
//     event.target.currentPlaceholder.voteCount++;
//     saveAll();
//     //After vote, replace images for new vote
//     displayImages();
//   });
// }



///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
function Placeholder(name, src, testShowCount, testVoteCount) {
  this.name = name;
  this.src = src;
  //If no testShowCount or testVoteCount count was given, use zero;
  this.timesViewed = 0;
  this.timesClicked = 0;
  this.showCount = testShowCount || 0;
  this.voteCount = testVoteCount || 0;
  //Add this instance to our catalog of placeholders
  Placeholder.all.push(this);
}
Placeholder.all = [];


function initialize(){
  // Placeholder.voteCount = 0;
  // Placeholder.all = [];

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

  //console.log('Voting Images', Placeholder.all);
  //displayImages();
  //saveAll();
}
initialize();
//////////////////////////////////////////////////////////////////////
//END PLACEHOLDER
//////////////////////////////////////////////////////////////////////










///////////////////////////////////////////////////////////////////////
//RETURNS THE LIST OF RESULTS
//////////////////////////////////////////////////////////////////////

// console.log('All PlaceHolder:  ', Placeholder.all);
// //show current results
// function showResults(){
//   document.getElementById('resultsWrapper').style.display = 'block';
//   var ul = document.getElementById('results');
//   //reset list
//   ul.innerHTML = '';
//   //for each placholder image...
//   for(var i = 0; i < Placeholder.all.length; i++){
//     var current = Placeholder.all[i];
//     //add to <ul id="results">
//     var li = document.createElement('li');
//     li.textContent = current.name + ' got ' + current.voteCount + ' votes';
//     ul.appendChild(li);
//   }
//   //showResultChart();
// }
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////







//////////////////////////////////////////////////////////
//This starts the Canvas js ///
//////////////////////////////////////////////////////////
// function showResultChart(){
//   var canvas = document.getElementById('resultsCanvas');

//   //Un-hide our Canvas
//   canvas.style.display = 'block';

//   var labels = [];
//   var voteCounts = [];
//   var showCounts = [];
//   var votePercentage = [];

//   for(var i = 0; i < Placeholder.all.length; i++){
//     labels[i] = Placeholder.all[i].name;
//     voteCounts[i] = Placeholder.all[i].voteCount;
//     showCounts[i] = Placeholder.all[i].showCount;
//     //calculates % of times image got votes out of all times shown.
//     votePercentage[i] = 100 * voteCounts[i] / showCounts[i];

//   }


/////////////////////////////////////////////////////////////
//CHART JS FUNCTIONALITY
/////////////////////////////////////////////////////////////
//   var ctx = canvas.getContext('2d');

//   new Chart(ctx, {
//     type: 'bar',

//     data: {
//       labels: labels,
//       datasets: [
//         {
//           label: 'Vote Count',
//           backgroundColor: 'rgb(200,0,0,0.6)',
//           data: voteCounts
//         },
//         {
//           label:'Show Count',
//           backgroundColor: 'rgb(0,0,200,0.4)',
//           data: showCounts
//         },
//         {
//           label: 'Vote %',
//           data: votePercentage
//         }
//       ]
//     },
//     options:{
//       responsive: true,
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: true
//           }
//         }
//         ]
//       },
//       title: {
//         display: true,
//         text: 'Voting Results'
//       }
//     }
//   });
// }


// var resetButton = document.querySelector('button[type="reset"]');
// resetButton.addEventListener('click', function resetClick(event){
//   console.log('reset click', event);
//   initialize();
//   displayImages();
// });