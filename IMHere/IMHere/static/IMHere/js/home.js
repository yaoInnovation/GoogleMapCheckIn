var map;
var marker;
var searchBox;
var service;
var curPosition;
var curLat; // current latitude
var curLng; // current longtitude
var curAddress;
var current_address_div;
var req; // Ajax HTTP request
var emailAddr;


window.onload = function() {
	createMap();
	curAddress = document.getElementById("current_address");
	current_address_div = document.getElementById("current_address_div");

	// Disable form submittion
	var searchForm = document.getElementById("searchForm");
	$(searchForm).submit(function() {
  		return false;
	});
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
	var coords = new google.maps.LatLng(curPosition.coords.latitude, curPosition.coords.longitude);

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
	curLat = curPosition.coords.latitude;
	curLng = curPosition.coords.longitude;
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
    var address = JSON.parse(text);
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

		place=places[0];
		bounds.extend(place.geometry.location);
		marker.setPosition(place.geometry.location); // set maker position new
		
		// set up current postion
		curPosition = place;
		curLng = curPosition.geometry.location.lng();
		curLat = curPosition.geometry.location.lat();

		map.fitBounds(bounds); //fit to the bound
		map.setZoom(15); // set zoom

		curAddress.innerHTML = "Your current address: " + document.getElementById('AddressInput').value + " "; // Update current address
		makeAddressVisible();
	});
}

function makeAddressVisible() {
	current_address_div.style.display = 'block';
}

/**
 * Email
 */

 function checkIn() {
    emailAddr = prompt("Please enter the email where you want to send");
    
    //Send email
    sendEmail(emailAddr);
 }

 function sendEmail(emailAddr) {
 	var username = document.getElementById("username").innerHTML;
 	var htmlContent = "Hi, This is " + username +"\nIm Here:\n"+
 		"http://localhost:8000/IMHere/get_static_map?latitude="+curLat+
 		"&longitude="+curLng
	
	var link = "mailto:"+emailAddr+"?"+
             // "cc=mm6+@andrew.cmu.edu"+
             "&subject=" + escape("IM here!")+
             "&body=" + escape(htmlContent);
  	window.location.href = link;

	// $.ajax({
	// 	type: "POST",
	// 	url: "https://mandrillapp.com/api/1.0/messages/send.json",
	// 	data: {
	// 		"key": "7JuclCDKBHloNAciR4Jblg",
	// 		"message": {
	// 		  "from_email": "ZhouYaoMaster@gmail.com",
	// 		  "from_name": "yao",
	// 		  "to": [{
	// 		        "email": "408431525@qq.com",
	// 		        "type": "to"
	// 		   }],
	// 		  "autotext": "true",
	// 		  "subject": "IM Here",
	// 		  "html": htmlContent,
	// 		}
	// 	}
	// }).done(function(response) {
	// 	console.log(response); // if you're into that sorta thing
	// });
 }

 // function static_map_address() {
 // 	var url = 'https://maps.googleapis.com/maps/api/staticmap?center='+
 // 	curPosition.coords.latitude+','+curPosition.coords.longitude +'&zoom=15&size=400x400&maptype=roadmap&markers=color:red%7Clabel:Here%7C'+
 // 	curPosition.coords.latitude+','+curPosition.coords.longitude+
 // 	'&key=AIzaSyCft27UMj4DLzari4aaiSBGf1xPY7kSJCs';
 // 	return url;
 // }

