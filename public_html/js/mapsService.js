var map;
var service;
var infowindow;

function initialize() {
    var iasi = new google.maps.LatLng(47.1569, 27.5903);

    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: iasi,
        zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
}

function mapsSearch(keywords) {
    var iasi = new google.maps.LatLng(47.1569, 27.5903);

    var request = {
        location: iasi,
        radius: '500',
        query: keywords
    };

    service.textSearch(request, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        if (results.length > 0) {
            map = new google.maps.Map(document.getElementById('map-canvas'), {
                center: results[0].geometry.location,
                zoom: 15
            });
            
            createMarker(results[0]);

            for (var i = 1; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);