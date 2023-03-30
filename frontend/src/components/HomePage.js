import './homepage.css';
import {Link} from 'react-router-dom';
import React, { useRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {getEvents} from '../utils/ticketMasterAPI.js';

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
      const events = getEvents('Columbus', 'OH');
      console.log(events);
    };

    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
      componentRestrictions: { country: "usa" },
      fields: ['ALL'],
      types: ["establishment"]
    };
    useEffect(() => {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
      );
    });

    return (
      <div className="search-container">
        <h1 className="search-title">Pick Your Next Trip</h1>
        <div className="search-inputs">
          <div className="search-input destination">
            <label htmlFor="city-input">Destination</label><br/>
            <input
              ref={inputRef} //autocomplete ref
              type="text"
              id="city-input"
              value={city}
              onChange={handleCityChange}
              placeholder="e.g. Sheraton Columbus Hotel at Capitol Square"
            />
          </div>
          <div className="date-picker-container">
            <div className="search-input">
              <label htmlFor="start-date-input">Start Date</label>
              <DatePicker
                showIcon
                id="start-date-input"
                selected={startDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                onChange={handleStartDateChange}
                dateFormat="MM/d/yyyy"
                placeholderText="Select a date"
              />
            </div>
            <div className="search-input">
              <label htmlFor="end-date-input">End Date</label>
              <DatePicker
                showIcon
                id="end-date-input"
                selected={endDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                onChange={handleEndDateChange}
                dateFormat="MM/d/yyyy"
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