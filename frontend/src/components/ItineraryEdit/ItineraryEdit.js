import React, { useState } from "react";
import './itinerary-edit.css';
import {ActivityCard} from "./activityCard";
import {sample_activities} from "../../sample_data/sample_activities.js";
import { FaBars } from 'react-icons/fa';
import {Link} from 'react-router-dom';

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
                      <li><Link to="/login">Logout</Link></li>
                      <li>Settings</li>
                      <li><Link to="/list">My Trips</Link></li>
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