var map = [];
var socket = io('http://localhost:3000');

socket.on('connect',function(data){
  console.log('connected');
});

var i = 0;
socket.on('tweet', function (tweet) {
  //console.log(tweet.tweet);
  if(i > 50) {
    socket.close();
  }
  
  //console.log(tweet);
  var uluru = {lat: tweet['lat'], lng: tweet['long']};
  var marker = new google.maps.Marker({position: uluru, map: map});

  var contentString = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  //'<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
  '<div id="bodyContent">'+
  '<p>{placeholder}</p>'+
  '</div>'+
  '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString.replace('placeholder', tweet['tweet'])
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  i++;
});

window.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.397, lng: -75.644},
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true      
    });
}




