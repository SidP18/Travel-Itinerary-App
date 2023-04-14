import React, { useState, useRef, useEffect, useContext } from "react";
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { Register } from "./Register";
import AuthContext from "./AuthProvider";
import { HomePage } from "../HomePage";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAuth({ email, pass})
        console.log(email)
        setSuccess(true)

        // try{
        //     const response = await axiosAuth.post(LOGIN_URL, 
        //         JSON.stringify({email, pass}),
        //         {
        //             headers: { 'Content-Type': 'application/json'},
        //             withCredentials: true
        //         }
        //         );
        //         console.log(JSON.stringify(response?.data))
        //         const accessToken = JSON.stringify(response?.data.accessToken)
                
        // }catch (err){
        //     if(!err?.response){
        //         setErrMsg('No Message Recived')
        //     }else if(!err.response?.status === 400){
        //         setErrMsg('Missing Email or Password')
        //     }else if(!err.response?.status === 401){
        //         setErrMsg('Unauthorized. You may need to make an account!')
        //     }else {
        //         setErrMsg('Login Failed');
        //     }
        // }
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
                    <button type="submit" className="form-buttons">Register</button>

                    {/* <Link to="/register" className="route-links" element={<Register/>} > Don't have an account? Register here. </Link>
                    <Link to="/" className="route-links"> Go to my trips </Link> */}
                </form>
            </div>
        )
    }</>
)
}