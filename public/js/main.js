var map = [];
var socket = io('http://localhost:3000');

socket.on('connect',function(data){
  console.log('connected');
});

var i = 0;
socket.on('tweet', function (tweet) {
  console.log(tweet);
  if(i > 15) {
    socket.close();
  }
  
  //console.log(tweet);
  var uluru = {lat: tweet['lat'], lng: tweet['long']};

  var hateSpeechPercentage = tweet['classification'][0]['confidence'];
  var offensiveLanguagePercentage = tweet['classification'][1]['confidence'];
  var neitherPercentage = tweet['classification'][2]['confidence'];

  var marker = new google.maps.Marker({
    position: uluru, 
    map: map,
    animation: google.maps.Animation.DROP });

  var contentString = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  //'<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
  '<div id="bodyContent">'+
  '<p>{placeholder}</p>'+ '<br>'
  '<p>Hate Speech: ' + hateSpeechPercentage + '</p>'+
  '<p>Offensive Language: ' + offensiveLanguagePercentage + '</p>'+
  '<p>Neither: ' + neitherPercentage + '</p>'+
  '</div>'+
  '</div>';

  var tweetClassification;
  var cardColor;

  if(hateSpeechPercentage > offensiveLanguagePercentage && hateSpeechPercentage > neitherPercentage) {
    tweetClassification = "Hate Speech";
    color = '#ef476f';
  } else if(offensiveLanguagePercentage > hateSpeechPercentage && offensiveLanguagePercentage > neitherPercentage) {
    tweetClassification = "Offensive Language";
    color = '#ffd166';
  } else {
    tweetClassification = "Neither";
    color = '#06d6a0';
  }

  var infowindow = new google.maps.InfoWindow({
    content: contentString.replace('placeholder', tweet['tweet'])
  });

  var HTMLtext =  '<p>' + tweet['tweet'] + '</p>' +
                  '<ul>' + 
                  '<li>Hate Speech: ' + hateSpeechPercentage + '</li>'+
                  '<li>Offensive Language: ' + offensiveLanguagePercentage + '</li>'+
                  '<li>Neither: ' + neitherPercentage + '</li>' + 
                  '</ul>';

  var tweetBox = 		'<div id="' + tweet.id+ '" class="card" style="background-color: ' +  color + ';">' + 
  '<header class="card-header">' +
    '<p class="card-header-title">' +
      tweetClassification +
    '</p>' +
    '<a href="#" class="card-header-icon" aria-label="more options">' +
  '<span class="icon">' +
    '<i class="fas fa-angle-down" aria-hidden="true"></i>' + 
  '</span>' +
'</a>' +
  '</header>' +
  '<div class="card-content">' + 
    '<div class="content">' +
      HTMLtext +
    '</div>' + 
  '</div>' +
'</div>';
                  
  //var tweetBox = '<div id="' + tweet.id + '" class="tile is-vertical" style="border:1px solid white;">' + HTMLtext + '</div>';

  $(".stream").prepend(tweetBox);

  $("#" + tweet.id).click(function() {
    google.maps.event.trigger(marker, 'click');
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
      disableDefaultUI: true,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
}




