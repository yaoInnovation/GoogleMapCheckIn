var map;
var marker;
var searchBox;
var service;
var curPosition;
var curAddress;
var current_address_div;
var req; // Ajax HTTP request

window.onload = function() {
	createMap();
	curAddress = document.getElementById("current_address");
	current_address_div = document.getElementById("current_address_div");
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

	getAddressFromPosition(position)
}

function getAddressFromPosition(position) {
	if(window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    } else {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    req.onreadystatechange = handleAddressConvertResponse;
    var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","
    	+position.coords.longitude+"&sensor=true";
    console.log(url);
    req.open("GET", url, true);
    req.send();
}

function handleAddressConvertResponse() {
    if(req.readyState != 4 || req.status != 200) {
        return;
    }

    var text = req.responseText;
    var address = JSON.parse(text)
    curAddress.innerHTML = "Your current address: " + address["results"][0]["formatted_address"] + " "; // Update current address
	makeAddressVisible();
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
			lat:40.442630,
			lng:-79.942950
		},
		zoom:15
	});

	marker = new google.maps.Marker({
		position: {
			lat:40.442630,
			lng:-79.942950
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

		curAddress.innerHTML = "Your current address: " + document.getElementById('AddressInput').value + " "; // Update current address
		makeAddressVisible();
	});
}

function makeAddressVisible() {
	current_address_div.style.display = 'block';
}