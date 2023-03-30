import React, { useState } from "react";
import './itinerary-edit.css';
import {ActivityCard} from "./activityCard";
import {NavBar} from '../NavBar';
import {EventCard} from './EventCard';
import restaurantData from '../../sample_data/placesdata.json';
import eventData from '../../sample_data/ticketmaster.json';

export const ItineraryEdit = (props) => {
    const [savedRestaurants, setSavedRestaurants] = useState([]);
    const [currentRestaurantIndex, setCurrentRestaurantIndex] = useState(0);

    const [savedEvents, setSavedEvents] = useState([]);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);

    let restaurantList = [];
    for (var key in restaurantData.places) {
        restaurantList.push(restaurantData.places[key]);
    }

    let eventList = [];
    for (var key in eventData._embedded.events) {
        eventList.push(eventData._embedded.events[key]);
    }

    const restaurantLiked = () => {
        if (savedRestaurants.length < 3) {
            setSavedRestaurants([...savedRestaurants, restaurantList[currentRestaurantIndex]]);
        }
        setCurrentRestaurantIndex(currentRestaurantIndex + 1);
    };

    const restaurantDisliked = () => {
        setCurrentRestaurantIndex(currentRestaurantIndex + 1);
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
                        <ActivityCard
                           category={restaurantData.requestType}
                           image={restaurant.url}
                           name={restaurant.name}
                           description={restaurant.formatted_address}
                           disliked = {restaurantDisliked}
                           liked = {restaurantLiked}/>
                    ))
                }
                {(currentRestaurantIndex < restaurantList.length && savedRestaurants.length < 3) ? (
                    <ActivityCard
                               category={restaurantData.requestType}
                               image={restaurantList[currentRestaurantIndex].url}
                               name={restaurantList[currentRestaurantIndex].name}
                               description={restaurantList[currentRestaurantIndex].formatted_address}
                               disliked = {restaurantDisliked}
                               liked = {restaurantLiked}/>
                ) : (
                    <br/>
                )}


                <h1 className="list-label">Events</h1>
                {
                    savedEvents.map((event) => (
                        <EventCard
                            imageSrc={event.images[0].url}
                            date={event.dates.start.localDate}
                            name={event.name}
                            category={event.classifications[0].segment.name}
                            liked={eventLiked}
                            disliked={eventDisliked}
                        />
                    ))
                }
                {(currentEventIndex < eventList.length && savedEvents.length < 3) ? (
                    <EventCard
                        imageSrc={eventList[currentEventIndex].images[0].url}
                        date={eventList[currentEventIndex].dates.start.localDate}
                        name={eventList[currentEventIndex].name}
                        category={eventList[currentEventIndex].classifications[0].segment.name}
                        liked={eventLiked}
                        disliked={eventDisliked}
                    />
                ) : (
                    <br/>
                )}
            </div>
            <button className="finalizeButton">Finalize</button>
        </div>
    )
}