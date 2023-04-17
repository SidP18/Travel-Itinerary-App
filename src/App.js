import React, { useState, useEffect } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link}
    from 'react-router-dom';
import {ItineraryEdit} from './components/ItineraryEdit/ItineraryEdit';
import {Login} from './components/Auth/Login';
import {Register} from './components/Auth/Register';
import {HomePage} from './components/HomePage';

function App() {

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<HomePage/>} />
                <Route path='/edit' element={<ItineraryEdit/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
            </Routes>
            <Link to="/">Home</Link>
        </Router>
    );
}

export default App;