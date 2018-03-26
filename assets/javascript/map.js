// for the map page
var map;
var infoWindow;
var request;
var service;
var markers = [];
function initMap() {
    
    var center = new google.maps.LatLng(37.646152, -77.511429); 
    map = new google.maps.Map(document.getElementById('map'), {
        center: center, 
        zoom: 10
    }); 
    request = {
        location: center,
        radius: 100000,
        types: ["supermarket"]
    };    
    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
    google.maps.event.addListener(map, 'click', function(event) {
        map.setCenter(event.latLng)
        clearResults(markers)
        var request = {
            location: event.latLng,
            radius: 10000,
            types: ['supermarket']
        };
        service.nearbySearch(request, callback);
     })
} // Initialize function 
function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            markers.push(createMarker(results[i]));
        }
    }
}
function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    google.maps.event.addListener(marker, 'click', function() {
       infoWindow.setContent(place.name);
       infoWindow.open(map, this); 
    });
    return marker;
}
function clearResults(markers) {
    for (var m in markers) {
        markers[m].setMap(null)
    }
    markers = []
}