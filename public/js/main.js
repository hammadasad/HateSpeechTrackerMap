var map = [];

window.initMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.397, lng: -75.644},
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true      
    });
}


