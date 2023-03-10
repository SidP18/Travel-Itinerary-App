import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Link}
    from 'react-router-dom';
import {ItineraryEdit} from './components/ItineraryEdit/ItineraryEdit';
import {Login} from './components/Login';
import {Register} from './components/Register';
import {TodoListForm} from './components/TodoListForm';


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' exact element={<Login/>} />
                <Route path='/list' element={<TodoListForm/>} />
                <Route path='/edit' element={<ItineraryEdit/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
            </Routes>
            <Link to="/">Home</Link>
        </Router>
    );
}

export default App;