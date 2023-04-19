import './homepage.css';
import {Link} from 'react-router-dom';
import React, { useRef, useEffect, useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getData } from '../api/CallApis'
import { Autocomplete } from '@react-google-maps/api'
import AuthContext from './Auth/AuthProvider';
import {FilterModal} from './FilterModal';


export const HomePage = (props) => {
    const { auth } = useContext(AuthContext);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [filters, setFilters] = useState([]);
    const [coords, setCoords] = useState({ lat: 47.62557, lng: -122.334388 });

    const onLoad = (autoC) => setAutocomplete(autoC);
    const onPlaceChanged = () => {

      const place = autocomplete.getPlace()
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()

      setCoords({ lat: lat, lng: lng })
    }

    const handleStartDateChange = (date) => {
      setStartDate(date);
    };

    const handleEndDateChange = (date) => {
      setEndDate(date);
    };

    const handleSearch = () => {
      var trip = {
        "Trip_id": auth.trips.length + 1,
        "Location": autocomplete.getPlace().formatted_address,
        "Start_date": startDate,
        "End_date": endDate,
        "Restaurants": null,
        "Attractions": null,
        "Events": null
      }
      auth.trips.push(trip.Trip_id)

      getData(coords).then((result) => {
        trip.Restaurants = result.foods
        trip.Attractions = result.atts
        trip.Events = result.events
        console.log(trip)
        //es_upload(auth, trip)
      })
      window.location.href = "/edit";
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
          <FilterModal filters={filters} setFilters={setFilters}/>
          <br/>
          <button className="search-button" onClick={handleSearch}>Give me recommendations</button>
          <Link to="/edit" className="route-links"> Go to my trips </Link>
        </div>
      </div>
    );
}