var map;
var marker;
var searchBox;
var service;
var curPosition;

window.onload = function() {
	createMap();
}

function PinButtonClick() {
	if(navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(pinCallBack);
	} else {
	  error('Geo Location is not supported');
	}
}

function pinCallBack(position) {
	curPosition = position;
	var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	var options = {
	zoom: 15,
	center: coords,
	mapTypeControl: false,
	navigationControlOptions: {
		style: google.maps.NavigationControlStyle.SMALL
	},
	mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map-canvas"), options);

	marker = new google.maps.Marker({
	  position: coords,
	  map: map
	});
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}

function createMap() {
	map = new google.maps.Map(document.getElementById('map-canvas'), {
		center: {
			lat:27.72,
			lng:85.36
		},
		zoom:15
	});

	marker = new google.maps.Marker({
		position: {
			lat: 27.72,
			lng: 85.36
		},
		map:map,
		draggable:false
	});

	searchBox = new google.maps.places.SearchBox(document.getElementById('AddressInput'));

	// Place change event on search box
	google.maps.event.addListener(searchBox, 'places_changed', function() {

		var places = searchBox.getPlaces();

		// bound
		var bounds = new google.maps.LatLngBounds();
		var i, place;

		for(i = 0; place=places[i];i++) {
			bounds.extend(place.geometry.location);
			marker.setPosition(place.geometry.location); // set maker position new
		}

		map.fitBounds(bounds); //fit to the bound
		map.setZoom(15); // set zoom
	});
}