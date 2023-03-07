import React, { useState } from "react";
import './itinerary-edit.css';
import {ActivityCard} from "./activityCard";
import {sample_activities} from "../../sample_data/sample_activities.js";
import { FaBars } from 'react-icons/fa';

export const ItineraryEdit = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdown = () => {
        setIsOpen(!isOpen);
    }

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
                      <li>Log Out</li>
                      <li>Settings</li>
                      <li>My Trips</li>
                    </ul>
                  </div>
                )}
              </div>
            </nav>
            <div className="edit-list">
                {sample_activities.map(function(activity) {
                    return(
                        <ActivityCard
                            category={activity.category}
                            name={activity.name}
                            image={activity.image}
                            description={activity.description}
                        />
                    );
                })}
            </div>
            <button className="finalizeButton">Finalize</button>
        </div>
    )
}