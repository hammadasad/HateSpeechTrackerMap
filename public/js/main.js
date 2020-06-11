var map = [];
var socket = io('http://localhost:3000');

socket.on('connect',function(data){
  console.log('connected');
});

socket.on('tweet', function (tweet) {
  console.log(tweet.tweet);
});

window.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.397, lng: -75.644},
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true      
    });
}




