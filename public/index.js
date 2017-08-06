
var trendingG = [];
var trendingR = [];

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function(){
  if(this.status !== 200) return;
  console.log("apiCallComplete");
  var jsonString = this.responseText;
  trendingG = JSON.parse(jsonString).data;
  console.log(trendingG);
  console.log(trendingG[0].images.fixed_height_small_still.url);
}

var createUrl = function(searchTerm) {

};

var urlSearch = '';

var urlTrendG = 'https://api.giphy.com/v1/gifs/trending?api_key=09434f2b668440a6a0bf975337e3d736&limit=25&rating=G';

var urlTrendR = 'https://api.giphy.com/v1/gifs/trending?api_key=09434f2b668440a6a0bf975337e3d736&limit=25&rating=R';

var app = function () {
  // var url = 'https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=6dd937482f9a4b3d80fa2145a3fb4602';
  // var url = 'https://api.giphy.com/v1/gifs/search?api_key=09434f2b668440a6a0bf975337e3d736&q=SEARCHTEXTHERE&limit=25&offset=0&rating=G&lang=en'
  makeRequest(urlTrendG, requestComplete);



}

window.addEventListener('load', app);
