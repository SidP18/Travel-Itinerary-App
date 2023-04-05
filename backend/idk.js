
//   url: https://maps.googleapis.com/maps/api/place/textsearch/json?query=[yourquerystring]&key=[YOURAPIKEY]



export default class idk {

  constructor(location) {
    var loc = location
    const map = initMap();
    placesListData = getPlaces(map);
  }
  

  initMap() {
    // Create the map.
    getLoc(placeName);
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: loc,
      zoom: 17,
      mapId: "8d193001f940fde3",
    });
    return map
  }

  getPlaces(map){
    const service = new window.google.maps.places.PlacesService(map);

    var request = { location: loc, radius: 500, type: "restaurant" };
    var placesList = {};

    service.textSearch(
      request,
      (results, status) => {
        if (status !== "OK" || !results){
          console.log(status); 
          return;
        }
        placesList = addPlaces(results, request);
      }
    );
    return placesList
  }

  addPlaces(places, request) {
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

    return placesList
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

}

//This should be changed to a write to the elasticsearch database
