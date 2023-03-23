import './homepage.css';
import { FaBars } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const HomePage = (props) => {
    const [city, setCity] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleCityChange = (event) => {
      setCity(event.target.value);
    };

    const handleStartDateChange = (date) => {
      setStartDate(date);
    };

    const handleEndDateChange = (date) => {
      setEndDate(date);
    };

    const handleSearch = () => {
      // Handle search functionality here, using city, startDate, and endDate state values
      console.log(city);
      console.log(startDate);
      console.log(endDate);
    };

    return (
      <div className="search-container">
        <h1 className="search-title">Pick Your Next Trip</h1>
        <div className="search-inputs">
          <div className="search-input destination">
            <label htmlFor="city-input">Destination</label><br/>
            <input
              type="text"
              id="city-input"
              value={city}
              onChange={handleCityChange}
              placeholder="e.g. Tokyo, Japan"
            />
          </div>
          <div className="date-picker-container">
            <div className="search-input">
              <label htmlFor="start-date-input">Start Date</label>
              <DatePicker
                showIcon
                id="start-date-input"
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="M/d/yyyy"
                placeholderText="Select a date"
              />
            </div>
            <div className="search-input">
              <label htmlFor="end-date-input">End Date</label>
              <DatePicker
                showIcon
                id="end-date-input"
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="M/d/yyyy"
                placeholderText="Select a date"
              />
            </div>
          </div>

          <br/>
          <button className="search-button" onClick={handleSearch}>Give me recommendations</button>
          <Link to="/edit" className="route-links"> Go to my trips </Link>
        </div>
      </div>
    );
}