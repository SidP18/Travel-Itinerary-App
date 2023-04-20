import React, { useState, useEffect } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate}
    from 'react-router-dom';
import {ItineraryEdit} from './components/ItineraryEdit/ItineraryEdit';
import {Login} from './components/Auth/Login';
import {Register} from './components/Auth/Register';
import {HomePage} from './components/HomePage';

function App() {

    const [restaurants, setRestaurants] = useState([]);
    const [attractions, setAttractions] = useState([]);
    const [events, setEvents] = useState([]);

    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/login' element={<Login/>} />
                    <Route path='/' element={<Register/>} />
                    <Route exact path='/home' element={<HomePage setRestaurants={setRestaurants} setAttractions={setAttractions} setEvents={setEvents}/>} />
                    <Route path='/edit' element={<ItineraryEdit restaurants={restaurants} attractions={attractions} events={events}/>} />
                </Routes>
                {/* <Link to="/">Home</Link> */}
            </Router>
        </div>
        
    );
}

export default App;