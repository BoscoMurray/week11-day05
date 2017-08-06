
var trendingG = [];
var trendingR = [];

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
};

var requestComplete = function(){
  if(this.status !== 200) return;
  console.log("apiCallComplete");
  var jsonString = this.responseText;
  trendingG = JSON.parse(jsonString).data;
  populateList(trendingG);
};

var populateList = function(giphs){
  var div = document.querySelector('#trending');

  giphs.forEach(function(giph){
    img = createImg(giph.images.fixed_height_small.url);
    div.appendChild(img);
  });
};

var createImg = function(imgUrl) {
  var img = document.createElement("img");
  img.height = 100;
  img.src = imgUrl;
  img.hspace = 5;
  return img;
};

var handleButtonClick = function() {
  var input = document.querySelector('input');
  var url = createUrl(input.value);
  makeRequest(url, searchComplete)
};

var searchComplete = function() {
  if(this.status !== 200) return;
  console.log("searchComplete");
  var jsonString = this.responseText;
  search = JSON.parse(jsonString).data;
  populateSearch(search);
}

var populateSearch = function(giphs){
  if (document.querySelector('#giphs')) {
    document.querySelector('#giphs').remove();
  };
  var divSearch = document.querySelector('#search');
  var divGiphs = document.createElement('div');
  divGiphs.id = 'giphs';
  giphs.forEach(function(giph){
    img = createImg(giph.images.fixed_height_small.url);
    divGiphs.appendChild(img);
  });
  divSearch.appendChild(divGiphs);
};

var createUrl = function(searchTerm) {
  var url = 'https://api.giphy.com/v1/gifs/search?api_key=09434f2b668440a6a0bf975337e3d736&q=' + searchTerm + '&limit=25&offset=0&rating=G&lang=en';
  return url;
};

var urlTrendG = 'https://api.giphy.com/v1/gifs/trending?api_key=09434f2b668440a6a0bf975337e3d736&limit=25&rating=G';

var urlTrendR = 'https://api.giphy.com/v1/gifs/trending?api_key=09434f2b668440a6a0bf975337e3d736&limit=25&rating=R';

var app = function () {
  makeRequest(urlTrendG, requestComplete);

  var buttonSearch = document.querySelector('#button-search');
  buttonSearch.addEventListener('click', handleButtonClick);

};

window.addEventListener('load', app);
