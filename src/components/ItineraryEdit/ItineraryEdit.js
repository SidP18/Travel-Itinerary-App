import React, { useState } from "react";
import './itinerary-edit.css';
import {RestaurantCard} from "./activityCard";
import {AttractionCard} from "./AttractionCard";
import {NavBar} from '../NavBar';
import {EventCard} from './EventCard';
import AuthContext from '../Auth/AuthProvider';
import Trip from '../Trip';

export const ItineraryEdit = (props) => {

    var trip = JSON.parse(sessionStorage.trip);

    const restaurantData = trip.Restaurants;
    const attractionData = trip.Attractions;
    const eventData = trip.Events;

    console.log(restaurantData);
    console.log(attractionData);
    console.log(eventData);

    const [savedRestaurants, setSavedRestaurants] = useState([]);
    const [currentRestaurantIndex, setCurrentRestaurantIndex] = useState(0);

    const [savedAttractions, setSavedAttractions] = useState([]);
    const [currentAttractionIndex, setCurrentAttractionIndex] = useState(0);

    const [savedEvents, setSavedEvents] = useState([]);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);

    let restaurantList = restaurantData;
    for (var i = 0; i < restaurantData; i++) {
        if ("ad_position" in restaurantData[i]) {
        } else {
            restaurantList.push(restaurantData[i])
        }
    }

    let attractionList = attractionData;

    let eventList = eventData;

    const restaurantLiked = () => {
        if (savedRestaurants.length < 3) {
            setSavedRestaurants([...savedRestaurants, restaurantList[currentRestaurantIndex]]);
        }
        if (restaurantData[currentRestaurantIndex+1].hasOwnProperty('ad_position')) {
            setCurrentRestaurantIndex(currentRestaurantIndex + 2);
        } else {
            setCurrentRestaurantIndex(currentRestaurantIndex + 1);
        }
    };

    const restaurantDisliked = () => {
        if (restaurantData[currentRestaurantIndex+1].hasOwnProperty('ad_position')) {
            setCurrentRestaurantIndex(currentRestaurantIndex + 2);
        } else {
            setCurrentRestaurantIndex(currentRestaurantIndex + 1);
        }
    };

    const attractionLiked = () => {
        if (savedAttractions.length < 3) {
            setSavedAttractions([...savedAttractions, attractionList[currentAttractionIndex]]);
        }
        setCurrentAttractionIndex(currentAttractionIndex + 1);
    };

    const attractionDisliked = () => {
        setCurrentAttractionIndex(currentAttractionIndex + 1);
    };

    const eventLiked = () => {
        if (savedEvents.length < 3) {
            setSavedEvents([...savedEvents, eventList[currentEventIndex]]);
        }
        setCurrentEventIndex(currentEventIndex + 1);
    };

    const eventDisliked = () => {
        setCurrentEventIndex(currentEventIndex + 1);
    };

    return (
        <div className="itinerary-edit-page">
            <NavBar/>
            <div className="edit-list">
                <h1 className="list-label">Restaurants</h1>
                {
                    savedRestaurants.map((restaurant) => (
                        <RestaurantCard
                          address= {restaurant.address}
                          description= {restaurant.name}
                          phoneNumber= {restaurant.phone}
                          website= {restaurant.web_url}
                          photoUrl= {restaurant.photo.images.small.url}
                          rating= {restaurant.rating}
                          price= {restaurant.price_level}
                          liked={restaurantLiked}
                          disliked={restaurantDisliked}
                        />
                    ))
                }
                {(currentRestaurantIndex < restaurantList.length & savedRestaurants.length < 3) ? (
                    <RestaurantCard
                      address= {restaurantList[currentRestaurantIndex].address}
                      description= {restaurantList[currentRestaurantIndex].name}
                      dietaryRestrictions= {restaurantList[currentRestaurantIndex].dietary_restrictions}
                      phoneNumber= {restaurantList[currentRestaurantIndex].phone}
                      website= {restaurantList[currentRestaurantIndex].web_url}
                      photoUrl= {restaurantList[currentRestaurantIndex].photo.images.small.url}
                      rating= {restaurantList[currentRestaurantIndex].rating}
                      price= {restaurantList[currentRestaurantIndex].price_level}
                      liked={restaurantLiked}
                      disliked={restaurantDisliked}
                    />
                ) : (
                    <br/>
                )}


                {
//                    savedAttractions.map((attraction) => (
//                        <AttractionCard
//                           address={attraction.address}
//                           description={attraction.name}
//                           website={attraction.web_url}
//                           disliked = {attractionDisliked}
//                           liked = {attractionLiked}/>
//                    ))
                }
                {
//                    (currentAttractionIndex < attractionList.length && savedAttractions.length < 3) ? (
//                        <AttractionCard
//                            description={attractionList[currentAttractionIndex].name}
//                            disliked = {attractionDisliked}
//                            liked = {attractionLiked}/>
//                    ) : (
//                        <br/>
//                    )
                }

                <h1 className="list-label">Events</h1>
                {
                    savedEvents.map((event) => (
                        <EventCard
                            image={event.images[0].url}
                            date={event.dates.start.localDate}
                            name={event.name}
                            category={event.classifications[0].segment.name}
                            liked={eventLiked}
                            disliked={eventDisliked}
                        />
                    ))
                }
                {
                    (currentEventIndex < eventList.length && savedEvents.length < 3) ? (
                        <EventCard
                            image={eventList[currentEventIndex].images[0].url}
                            date={eventList[currentEventIndex].dates.start.localDate}
                            name={eventList[currentEventIndex].name}
                            liked={eventLiked}
                            disliked={eventDisliked}
                        />
                    ) : (
                        <br/>
                    )
                }
            </div>
            <button className="finalizeButton">Finalize</button>
        </div>
    )
}