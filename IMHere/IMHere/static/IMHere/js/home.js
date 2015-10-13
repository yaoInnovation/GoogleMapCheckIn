window.onload = function() {

	var map = new google.maps.Map(document.getElementById('map-canvas'), {
		center: {
			lat:27.72,
			lng:85.36
		},
		zoom:15
	});

	var marker = new google.maps.Marker({
		position: {
			lat: 27.72,
			lng: 85.36
		},
		map:map,
		draggable:false
	});

	var searchBox = new google.maps.places.SearchBox(document.getElementById('AddressInput'));

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