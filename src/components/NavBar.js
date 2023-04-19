import React, { useState } from "react";
import {Link} from 'react-router-dom';
import './ItineraryEdit/itinerary-edit.css';
import { FaBars } from 'react-icons/fa';

export const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleDropdown = () => {
            setIsOpen(!isOpen);
    }

    return (
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
                  <li><Link to="/home">My Trips</Link></li>
                </ul>
              </div>
            )}
          </div>
        </nav>
    )
}