import React, { useState } from "react";
import './itinerary-edit.css';
import {ActivityCard} from "./activityCard";
import {sample_activities} from "../../sample_data/sample_activities.js";
import { FaBars } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import data from '../../sample_data/placesdata.json';

export const ItineraryEdit = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    let restaurantList = [];
    let restaurantIndicator = 0;

    const handleDropdown = () => {
        setIsOpen(!isOpen);
    }

    const disliked = () => {
        restaurantIndicator++;
        setRestaurant(<ActivityCard
                         category={data.requestType}
                         image={restaurantList[restaurantIndicator].url}
                         name={restaurantList[restaurantIndicator].name}
                         description={restaurantList[restaurantIndicator].formatted_address}
                         disliked = {disliked}
                     />);
    }

    for (var key in data.places) {
        restaurantList.push(data.places[key]);
    }

    const [restaurant, setRestaurant] = useState(<ActivityCard
                                                       category={data.requestType}
                                                       image={restaurantList[restaurantIndicator].url}
                                                       name={restaurantList[restaurantIndicator].name}
                                                       description={restaurantList[restaurantIndicator].formatted_address}
                                                       disliked = {disliked}
                                                   />);

    return (
        <div className="itinerary-edit-page">
            <nav className="navigation-bar">
              <div className="left-side">
                <h1>Welcome, Sean!</h1>
              </div>
              <div className="right-side">
                <div className="hamburger-icon" onClick={handleDropdown}>
                  <FaBars />
                </div>
                {isOpen && (
                  <div className="dropdown-menu">
                    <ul>
                      <li><Link to="/login">Logout</Link></li>
                      <li>Settings</li>
                      <li><Link to="/list">My Trips</Link></li>
                    </ul>
                  </div>
                )}
              </div>
            </nav>
            <div className="edit-list">
                {
                    restaurant
                }
            </div>
            <button className="finalizeButton">Finalize</button>
        </div>
    )
}