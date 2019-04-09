// This sample requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap() {

  function placeEvent(content, lat, lng, location) {
      let infoPlace = new google.maps.InfoWindow({
          content: content
      });
      let place = new google.maps.Marker({
          position: {lat: lat, lng: lng},
          map: map,
          location: location,
      });
      place.addListener('click', function() {
          infoPlace.open(map, place);
        $('#countryMeetup').empty();
        $('#cityMeetup').empty();
        $('#placeMeetup').empty();
        const cafeLocation = place.location.split(',');
        $('#countryMeetup').val(cafeLocation[0]);
        $('#cityMeetup').val(cafeLocation[1]);
        $('#placeMeetup').val(cafeLocation[2]);
        map.setZoom(15);
      });
  }

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 40.738380, lng: -73.983070}

});

  var input = document.getElementById('pac-input');

  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.bindTo('bounds', map);

  var contentPlace1 = '<div id="content" style="max-width: 300px;">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

    placeEvent(contentPlace1, 40.738380, -73.983070, 'USA, NY, 293 3rd Ave BlueBell Cafe');
    placeEvent('', 40.738800, -73.983833, 'USA, NY, 158 E 23rd St The Globe');
    placeEvent('', 40.73955, -73.982230, 'USA, NY, 158 E 23rd St The Globe');
    placeEvent('', 40.694580, -73.982990, 'USA, NY, 327 Gold Street Forno Rosso');
    placeEvent('', 40.695049, -73.983566, 'USA, NY, 306 Gold Street Pollo d\'Oro');
    placeEvent('', 40.639530, -73.967529, 'USA, NY, 1108 Cortelyou Road The Farm Cafe');
    placeEvent('', 40.707481, -74.014671, 'USA, NY, 81 Washington St Westville');
    placeEvent('', 40.741580, -74.00760, 'USA, NY, 446 W 14th St');


  // Specify just the place data fields that you need.
  autocomplete.setFields(['place_id', 'geometry', 'name', 'formatted_address']);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);

  var geocoder = new google.maps.Geocoder;

  var marker = new google.maps.Marker({map: map});
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    var place = autocomplete.getPlace();
    const placeSplit = place.formatted_address.split(',').reverse();
    console.log(place);
    $('#countryMeetup').val(placeSplit[0]);
    $('#cityMeetup').val(placeSplit[1]);
    $('#placeMeetup').val(placeSplit.slice(2, 3, 4));

    if (!place.place_id) {
      return;
    }
    geocoder.geocode({'placeId': place.place_id}, function(results, status) {
      if (status !== 'OK') {
        window.alert('Geocoder failed due to: ' + status);
        return;
      }

      map.setZoom(11);
      map.setCenter(results[0].geometry.location);

      // Set the position of the marker using the place ID and location.
      marker.setPlace(
        {placeId: place.place_id, location: results[0].geometry.location});

      marker.setVisible(true);

      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-id'].textContent = place.place_id;
      infowindowContent.children['place-address'].textContent =
        results[0].formatted_address;

      infowindow.open(map, marker);
    });
  });
}
