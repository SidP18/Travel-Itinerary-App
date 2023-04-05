import './homepage.css';
import {Link} from 'react-router-dom';
import React, { useRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {getEvents} from '../utils/ticketMasterAPI.js';
import { getPlaceData } from '../api'
import { Autocomplete } from '@react-google-maps/api'


export const HomePage = (props) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [places, setPlaces] = useState([]);
    const [coords, setCoords] = useState({ lat: 47.62557, lng: -122.334388 });

    const onLoad = (autoC) => setAutocomplete(autoC);
    const onPlaceChanged = () => {
      const lat = autocomplete.getPlace().geometry.location.lat()
      const lng = autocomplete.getPlace().geometry.location.lng()

      setCoords({ lat: lat, lng: lng })
    }

    const handleStartDateChange = (date) => {
      setStartDate(date);
    };

    const handleEndDateChange = (date) => {
      setEndDate(date);
    };

    const handleSearch = () => {
      // Handle search functionality here, using city, startDate, and endDate state values
      getPlaceData(coords)
            .then((data) => {
                console.log(JSON.stringify(data))
                setPlaces(data)
            })

      const events = getEvents('Columbus', 'OH');
      console.log(events);
      
    }; 

    return (
      <div className="search-container">
        <h1 className="search-title">Pick Your Next Trip</h1>
        <div className="search-inputs">
          <div className="search-input destination">
            <label htmlFor="city-input">Destination</label><br/>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <input
                type="text"
                id="city-input"
                placeholder="e.g. Sheraton Columbus Hotel at Capitol Square"
              />
            </Autocomplete>
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