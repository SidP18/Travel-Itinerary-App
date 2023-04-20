var Trip = (function() {

    var trip = {
        "Restaurants": null,
        "Attractions": null,
        "Events": null
    }

    var getTrip = function() {
        return trip;
    }

    var setTrip = function(restaurants, attractions, events) {
        trip.restaurants = restaurants;
        trip.attractions = attractions;
        trip.events = events;
        console.log(trip);
    }

    return {
        getTrip: getTrip,
        setTrip: setTrip
    }

})();

export default Trip;