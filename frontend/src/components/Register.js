import React, { useState } from "react";
import {Link} from 'react-router-dom';
import './login.css'

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h1 className="login-form-title">Register</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="name" className="form-labels">Full name</label>
                <input className="form-inputs" value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />

                <label htmlFor="email" className="form-labels">Email</label>
                <input className="form-inputs" value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />

                <label htmlFor="password" className="form-labels">Password</label>
                <input className="form-inputs" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />

                <button type="submit" className="form-buttons">Log In</button>

                <Link className="route-links" to="/login"> Already have an account? Login here.</Link>
                <Link className="route-links" to="/list"> Go to my trips </Link>
            </form>
    </div>
    )
}