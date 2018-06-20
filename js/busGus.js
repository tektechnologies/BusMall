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
  //console.log('fromStorage', Placeholder.all);
}
//get next image for display, TODO: randomize those bits.

function getNextImage(){
  var nextIndex = Math.floor(Math.random() * Placeholder.all.length);
  var image = Placeholder.all[nextIndex];
  console.log(image.src);
  return image;
}



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
  img1.src = 'images/' + image1.src;
  //Save the current image so we can update its vote count.
  img1.currentPlaceholder = image1;
  //Track that image1 was shown

  //Display image 2
  var image2 = getNextImage();
  var img2 = document.getElementById('product-2');
  img2.src = 'images/' + image2.src;
  img2.currentPlaceholder = image2;
  //Todo: track that image2 was shown.


  var image3 = getNextImage();
  var img3 = document.getElementById('product-3');
  img3.src = 'images/' + image3.src;
  img3.currentPlaceholder = image3;
  //Todo: track that image2 was shown.
}

var productImages = document.querySelectorAll('#voting img');
for(var i = 0; i < productImages.length; i++) {
  productImages[i].addEventListener('click', function (event) {
    Placeholder.voteCount++;
    event.target.currentPlaceholder.voteCount++;
    // saveAll();
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
Placeholder.all = [];

function initialize(){
  Placeholder.voteCount = 0;
  new Placeholder('R2D2 bag', 'bag.jpg');
  new Placeholder('Thats Bannanas', 'banana.jpg');
  new Placeholder('iBathroom', 'bathroom.jpg');
  new Placeholder('BoostyBussin', 'boots.jpg');
  new Placeholder('BreakFast Box', 'breakfast.jpg');
  new Placeholder('Nope', 'bubblegum.jpg');
  new Placeholder('EagerChairin', 'chair.jpg');
  new Placeholder('They\'re Here', 'cthulhu.jpg');
  new Placeholder('Plata-Doggie', 'dog-duck.jpg');
  new Placeholder('Dragon4Dinner', 'dragon.jpg');
  new Placeholder('Pen Plate', 'pen.jpg');
  new Placeholder('PetSweep', 'pet-sweep.jpg');
  new Placeholder('Pizscissors-A', 'scissors.jpg');
  new Placeholder('SharkSleep', 'shark.jpg');
  new Placeholder('Baby Clean', 'sweep.jpg');
  new Placeholder('Hoth Cloth', 'tauntaun.jpg');
  new Placeholder('Uni-Spam', 'unicorn.jpg');
  new Placeholder('Tail TeraByte', 'usb.jpg');
  new Placeholder('Water Me', 'water-can.jpg');
  new Placeholder('wine-glass', 'wine-glass.jpg');

  console.log('Voting Images', Placeholder.all);

  // saveAll();
}


// //show current results
// function showResults(){
//   document.getElementById('results');

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
//   showResultChart();
// }

// ////////////////////////////////
// //This starts the Canvas js ///
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
//     votePercentage[i] = 100 * voteCounts[i] / showCounts[i];

//   }

//   var ctx = canvas.msGetInputContext('2d');

//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: labels,
//       datasets: [{
//         label: 'Vote Count',
//         backgroundColor: 'rgb(200,0,0,0.6)',
//         data: voteCounts
//       },
//       {
//         label:'Show Count',
//         backgroundColor: 'rgb(0,0,200,0.4)',
//         data: showCounts
//       },
//       {
//         label: 'Vote %',
//         data: votePercentage
//       }
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
