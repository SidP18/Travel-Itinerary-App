import React, { useState, useEffect } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate}
    from 'react-router-dom';
import {ItineraryEdit} from './components/ItineraryEdit/ItineraryEdit';
import {Login} from './components/Auth/Login';
import {Register} from './components/Auth/Register';
import {HomePage} from './components/HomePage';

function App() {
    const [currentForm, setCurrentForm] = useState('login')

    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Login/>} />
                    <Route exact path='/home' element={<HomePage/>} />
                    <Route path='/edit' element={<ItineraryEdit/>} />
                </Routes>
                {/* <Link to="/">Home</Link> */}
            </Router>
        </div>
        
    );
}

export default App;