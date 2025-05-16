import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from 'react-router-dom';
import './auth.css'; 
import axios from 'axios'
import { useUser } from '../contexts/UserContexts';


function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser, user } = useUser();

    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const token = await user.getIdToken();
            const response = await axios.get(`http://localhost:5000/api/users/${user.uid}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const userData = response.data;
            setUser(userData);

           if(userData.role === 'organizer'){
                navigate('/organizer-dashboard');
           }
        }catch (err){
            let message = 'An error occurred. Please try again.';
            if (err.code === 'auth/invalid-credential') message = 'Invalid email or password.';
            if (err.code === 'auth/user-not-found') message = 'No user found with this email.';
            if (err.code === 'auth/wrong-password') message = 'Incorrect password.';
            setError(message);
        }
    }

    useEffect(() => {
        if(user){
            if(user.role === 'organizer'){
                navigate('/organizer-dashboard');
            }else if(user.role === 'volunteer'){
                navigate('/volunteer-dashboard');
            }
        }
    }, [user, navigate])

    return (
        <div className='auth-container'>
            <form onSubmit={handleSignIn} className='auth-form'>
                <h2 className='auth-title'>Welcome Back</h2>
                <p className='auth-subtitle'>Sign in to your account</p>

                <input 
                    type='email'
                    placeholder='Email'
                    value={email}
                    required
                    className='auth-input'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type='password'
                    placeholder='Password'
                    value={password}
                    required
                    className='auth-input'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit' className='auth-button'>Sign In</button>
                {error && <p style={{color: 'red'}} className='auth-error'>{error}</p>}
                <p className='auth-subtext'>
                    Don't have an account? <Link to="signup" className='auth-link'>Sign Up</Link>
                </p>
            </form>
        </div>
    );
}



export default SignIn;