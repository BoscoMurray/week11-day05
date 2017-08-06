
var makeRequest = function(url, callback){
  console.log(url);
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
};

var trendingComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var trending = JSON.parse(jsonString).data;
  populateList(trending);
};

var searchComplete = function() {
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var search = JSON.parse(jsonString).data;
  populateSearch(search);
}

var randomComplete = function() {
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var random = JSON.parse(jsonString).data;
  populateRandom(random);
}

var populateList = function(giphs){
  if (document.querySelector('#giphs1')) {
    document.querySelector('#giphs1').remove();
  };
  var divTrending = document.querySelector('#trending');
  var divGiphs = document.createElement('div');
  divGiphs.id = 'giphs1';

  giphs.forEach(function(giph){
    img = createImg(giph.images.fixed_height_small.url);
    divGiphs.appendChild(img);
  });
  divTrending.appendChild(divGiphs);
};

var populateSearch = function(giphs){
  if (document.querySelector('#giphs2')) {
    document.querySelector('#giphs2').remove();
  };
  var divSearch = document.querySelector('#search');
  var divGiphs = document.createElement('div');
  divGiphs.id = 'giphs2';
  giphs.forEach(function(giph){
    img = createImg(giph.images.fixed_height_small.url);
    divGiphs.appendChild(img);
  });
  divSearch.appendChild(divGiphs);
};

var populateRandom = function(giphR){
  if (document.querySelector('#giph-random')) {
    document.querySelector('#giph-random').remove();
  };
  var divRandom = document.querySelector('#random');
  var divGiphs = document.createElement('div');
  divGiphs.id = 'giph-random';
  console.log(giphR);
  img = createImg(giphR.fixed_height_small_url);
  divGiphs.appendChild(img);
  divRandom.appendChild(divGiphs);
};

var createImg = function(imgUrl) {
  var img = document.createElement("img");
  img.height = 100;
  img.src = imgUrl;
  img.hspace = 5;
  return img;
};

var handleButtonSearch = function() {
  var input = document.querySelector('input');
  var url = createUrl(input.value);
  makeRequest(url, searchComplete);
};

var handleButtonRandom = function() {
  makeRequest(urlRandom, randomComplete);
};



var createUrl = function(searchTerm) {
  var url = 'https://api.giphy.com/v1/gifs/search?api_key=09434f2b668440a6a0bf975337e3d736&q=' + searchTerm + '&limit=25&offset=0&rating=G&lang=en';
  return url;
};

var urlTrending = 'https://api.giphy.com/v1/gifs/trending?api_key=09434f2b668440a6a0bf975337e3d736&limit=25&rating=G';

var urlRandom = 'https://api.giphy.com/v1/gifs/random?api_key=09434f2b668440a6a0bf975337e3d736&tag=&rating=G';

var app = function () {
  makeRequest(urlTrending, trendingComplete);

  var buttonSearch = document.querySelector('#button-search');
  buttonSearch.addEventListener('click', handleButtonSearch);

  var buttonRandom = document.querySelector('#button-random');
  buttonRandom.addEventListener('click', handleButtonRandom);

};

window.addEventListener('load', app);
