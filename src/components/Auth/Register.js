import React, { useState, useRef, useContext, useEffect } from "react";
import {Link} from 'react-router-dom';
import { Login } from "./Login";
import './login.css'
import AuthContext from "./AuthProvider";
import { HomePage } from "../HomePage";
import { md5 } from 'hash-wasm';
import { addUser, userSearch } from "../../api/ElasticAPI";

export const Register = (props) => {
    const { auth, setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        setErrMsg('');
    }, [email, pass])

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hash password
        md5(pass).then(function(hash){
            var trips = []
            setAuth({ name, email, hash, trips})
            // userSearch({ name, email, hash, trips}).then((data) =>{
            //     if(data.max_score > 0){
            //         addUser({ name, email, hash, trips})
            //         setSuccess(true)
            //     }else{
            //         setErrMsg("Account already exists")
            //     }
            // })
            console.log("User: " + email, hash)
            addUser({ name, email, hash, trips})
            setSuccess(true)
        })
    }

    return (
        <>{
            success ? (
                <HomePage></HomePage>
            ):(
            <div className="auth-form-container">
                <h1 className="login-form-title">Register</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="name" className="form-labels">Full name</label>
                    <input className="form-inputs" value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Full Name" />

                    <label htmlFor="email" className="form-labels">Email</label>
                    <input className="form-inputs" value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="your email@gmail.com" id="email" name="email" />

                    <label htmlFor="password" className="form-labels">Password</label>
                    <input className="form-inputs" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />

                    <button type="submit" className="form-buttons">Register</button>

                    <Link className="route-links" to="/login" element={<Login/>}> Already have an account? Login here.</Link>
                    <Link className="route-links" to="/home"> Go to my trips </Link>
                </form>
        </div>
        )
        }</>
    )
}