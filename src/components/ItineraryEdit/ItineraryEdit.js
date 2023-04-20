import React, { useState, useContext, useEffect } from "react";
import './itinerary-edit.css';
import {RestaurantCard} from "./activityCard";
import {AttractionCard} from "./AttractionCard";
import {NavBar} from '../NavBar';
import {EventCard} from './EventCard';
import restaurantData from '../../sample_data/placesdata.json';
import eventData from '../../sample_data/ticketmaster.json';
import AuthContext from "../Auth/AuthProvider";
import { filterAttSearch, filterEventSearch, filterRestSearch } from "../../api/ElasticAPI";
    
export const ItineraryEdit = (props) => {
    const { auth } = useContext(AuthContext);
//     var trip = JSON.parse(sessionStorage.trip);

//     const restaurantData = trip.Restaurants;
//     const attractionData = trip.Attractions;
//     const eventData = trip.Events;

//     console.log(restaurantData);
//     console.log(attractionData);
//     console.log(eventData);

// >>>>>>> origin/Attractions-and-Events-working
    const [savedRestaurants, setSavedRestaurants] = useState([]);
    const [currentRestaurantIndex, setCurrentRestaurantIndex] = useState(0);

    const [savedAttraction, setSavedAttraction] = useState([]);
    const [currentAttractionIndex, setCurrentAttractionIndex] = useState(0);

    const [savedEvents, setSavedEvents] = useState([]);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);

    const [restaurantData, setRestaurantData] = useState([]);
    const [eventList, setEventList] = useState([]);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setSavedAttraction(Array(filterAttSearch(auth)))
        setEventList(Array(filterEventSearch(auth)))
        setRestaurantData(Array(filterRestSearch(auth)))
        setLoaded(true)
      }, []);

    let restaurantList = restaurantData;
    for (var i = 0; i < restaurantData; i++) {
        if ("ad_position" in restaurantData[i]) {
        } else {
            restaurantList.push(restaurantData[i])
        }
    }
    restaurantData = restaurantList;

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

    return (<>{
        !loaded ? (
            <div>
                <h1> Loading... </h1>
            </div>
        ):(
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
                {(currentRestaurantIndex < restaurantData.length & savedRestaurants.length < 3) ? (
                    <RestaurantCard
                      address= {restaurantData[currentRestaurantIndex].address}
                      description= {restaurantData[currentRestaurantIndex].name}
                      dietaryRestrictions= {restaurantData[currentRestaurantIndex].dietary_restrictions}
                      phoneNumber= {restaurantData[currentRestaurantIndex].phone}
                      website= {restaurantData[currentRestaurantIndex].web_url}
                      photoUrl= {restaurantData[currentRestaurantIndex].photo.images.small.url}
                      rating= {restaurantData[currentRestaurantIndex].rating}
                      price= {restaurantData[currentRestaurantIndex].price_level}
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
                        //event_t = JSON.stringify(event_t),
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
}</>)
}