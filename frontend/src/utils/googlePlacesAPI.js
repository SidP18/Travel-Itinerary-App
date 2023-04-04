import React from 'react';

//   url: https://maps.googleapis.com/maps/api/place/textsearch/json?query=[yourquerystring]&key=[YOURAPIKEY]

function GetPlace(props) {
  function initMap() {
    // Create the map.
    const seatte = { lat: 47.6256, lng: -122.3344 };
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: seatte,
      zoom: 17,
      mapId: "8d193001f940fde3",
    });
    // Create the places service.
    const service = new window.google.maps.places.PlacesService(map);

    var request = { location: seatte, radius: 500, type: "restaurant" };

    service.textSearch(
      request,
      (results, status) => {
        if (status !== "OK" || !results){
          console.log(status); 
          return;
        }

        addPlaces(results, request);
      }
    );
  }

  function addPlaces(places, request) {
    var placesList = {
      requestType: request.type,
      places:
      {

      }
    };

    var num = 0;
    for (var place of places) {
      if (place.geometry && place.geometry.location) {
        const placeData = {
          name: place.name,
          id: place.place_id,
          position: place.geometry.location,
          url: place.icon,
          formatted_address: place.formatted_address,
          business_status: place.business_status,
          rating: place.rating,
          simple_add: place.vicinity
        };

        var placeJsonLoc = "Place".concat(num);
        
        placesList.places[placeJsonLoc] = placeData;
        num ++;
      }
    }

    // require('fs').writeFile('src/data/request.json', JSON.stringify(placesList), (error) => {
    //   if (error) {
    //       throw error;
    //   }
    // });
    let jsonString = JSON.stringify(placesList)
    console.log(jsonString)
  }

  // function getPlaceDetails(id){
  //   var request = {
  //     placeId: id,
  //     fields: ['name', 'rating', 'formatted_phone_number', 'geometry']
  //   };
    
  //   service = new google.maps.places.PlacesService(map);
  //   service.getDetails(request, callback);
    
  //   function callback(place, status) {
  //     if (status == google.maps.places.PlacesServiceStatus.OK) {
  //       createMarker(place);
  //     }
  //   }
  // }

  window.initMap = initMap;

  return (
    <div>
      <header>
              <button onClick={initMap()}>
                Get new Place
              </button>
      </header>
    </div>
  );
}

export default GetPlace;



//     var map;
//     var service;
//     var currentQuery = "restaurant"
    
//     function initialize() {
//       var pyrmont = new window.google.maps.LatLng(47.6256,122.3344);
    
//       map = new window.google.maps.Map(document.getElementById('map'), {
//           center: pyrmont,
//           zoom: 15
//         });
    
//       var request = {
//         location: pyrmont,
//         radius: '2000',
//         query: currentQuery
//       };
    
//       service = new window.google.maps.places.PlacesService(map);
//       service.textSearch(request, callback);
//     }
    
//     function callback(results, status) {
//       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        
//         console.log(jsonContent);
//       } else {
//         console.log(status)
//       }
//     }

