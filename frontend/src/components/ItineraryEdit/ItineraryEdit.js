import React, { useState } from "react";
import './itinerary-edit.css';
import {ActivityCard} from "./activityCard";
import {NavBar} from '../NavBar';
import data from '../../sample_data/placesdata.json';

export const ItineraryEdit = (props) => {
    const [savedRestaurants, setSavedRestaurants] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    let restaurantList = [];
    for (var key in data.places) {
        restaurantList.push(data.places[key]);
    }

    const liked = () => {
        if (savedRestaurants.length < 3) {
            setSavedRestaurants([...savedRestaurants, restaurantList[currentIndex]]);
        }
        setCurrentIndex(currentIndex + 1);
    };

    const disliked = () => {
        setCurrentIndex(currentIndex + 1);
    };

    return (
        <div className="itinerary-edit-page">
            <NavBar/>
            <div className="edit-list">
                <h1 className="list-label">Restaurants</h1>
                {
                    savedRestaurants.map((restaurant) => (
                        <ActivityCard
                           category={data.requestType}
                           image={restaurant.url}
                           name={restaurant.name}
                           description={restaurant.formatted_address}
                           disliked = {disliked}
                           liked = {liked}/>
                    ))
                }
                {(currentIndex < restaurantList.length && savedRestaurants.length < 3) ? (
                    <ActivityCard
                               category={data.requestType}
                               image={restaurantList[currentIndex].url}
                               name={restaurantList[currentIndex].name}
                               description={restaurantList[currentIndex].formatted_address}
                               disliked = {disliked}
                               liked = {liked}/>
                ) : (
                    <br/>
                )}
                <h1 className="list-label">Events</h1>

            </div>
            <button className="finalizeButton">Finalize</button>
        </div>
    )
}