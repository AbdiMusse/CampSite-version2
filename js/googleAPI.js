// ---   Beginning of geo location
var mapLatitude, mapLongitude;
function geo_success(position) {
    mapLongitude = position.coords.longitude;
    mapLatitude = position.coords.latitude;
}
function geo_error(error) {
    alert('ERROR(' + error.code + '): ' + error.message);
}
var wpid = navigator.geolocation.watchPosition(geo_success, geo_error);
// End of geo location   ---

// --- Beginning of the google map
function initMap() {

    if( (mapLongitude && mapLatitude) === undefined) {
        showMyLocation(53.485366, -2.27175);
    } else {
        showMyLocation(mapLatitude, mapLongitude);
    }

    var marker, i;
    var infowindow = new google.maps.InfoWindow();
    var markers = locations.map(function(location, i) {
        //Creating the variables
        var name = locations[i]._campName;
        var lat = locations[i]._latitude;
        var long = locations[i]._longitude;
        var photo = locations[i]._picText;
        var id = locations[i]._idCamp;
        var content = "<div><img src='../images/" + photo + "' height='100px;' width='150px;'><p>" + name +
            "</p><p><a href='/campDetail.php?id=" + id + "'>Click for more info</a></p><div>";
        //End of creating variables

        var latlngset = new google.maps.LatLng(locations[i]._latitude, locations[i]._longitude);
        var marker = new google.maps.Marker({
            position: latlngset
        });
        google.maps.event.addListener(marker, 'click', function(evt) {
            infowindow.setContent(content);
            infowindow.open(map, marker);
        });
        return marker;
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}
//displays a specific place on the map if it exists
function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
        }
    });
}
//display the map, do auto-complete for the google search
function showMyLocation(lat, long) {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7, center: new google.maps.LatLng(lat, long),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    //display the text and button inside the map
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('address'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('submit'));
    //Auto-complete section
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('address'), {types: ['geocode']});
    autocomplete.setFields(['address_component']);
    //get geolocation of the searched term
    var geocoder = new google.maps.Geocoder();
    document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    });
    if (document.getElementById("address").value !== "") {
        geocodeAddress(geocoder, map);
    }
}