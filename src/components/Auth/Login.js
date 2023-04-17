import React, { useState, useRef, useEffect, useContext } from "react";
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { Register } from "./Register";
import AuthContext from "./AuthProvider";
import { HomePage } from "../HomePage";
import { md5 } from 'hash-wasm';

export const Login = (props) => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        setErrMsg('');
    }, [email, pass])

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hash password
        md5(pass).then(function(hash){
            setAuth({ email, hash})
            console.log(email, hash)
            setSuccess(true)
        })
    }

    return (
        <>{
            success ? (
                <HomePage></HomePage>
            ):(
            <div className="auth-form-container">
                <h1 className="login-form-title">Login</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <p ref={errRef} aria-live="assertive">{errMsg}</p>
                    <label htmlFor="email" className="form-labels">Email</label>
                    <input 
                        className="form-inputs" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" 
                        placeholder="your email@gmail.com" 
                        id="email" 
                        name="email"
                        ref={userRef}
                        required 
                    />

                    <label htmlFor="password" className="form-labels">Password</label>
                    <input 
                        className="form-inputs" 
                        value={pass} 
                        onChange={(e) => setPass(e.target.value)} 
                        type="password" 
                        placeholder="********" 
                        id="password" 
                        name="password"
                        required  />

                    <button type="submit" className="form-buttons">Log In</button>

                    <Link to="/register" className="route-links" element={<Register/>} > Don't have an account? Register here. </Link>
                </form>
            </div>
        )
    }</>
)
}