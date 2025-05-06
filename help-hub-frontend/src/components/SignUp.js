import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './auth.css'; 
import { Link, useNavigate } from 'react-router-dom';

function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [error, setError] = useState('');

    const [successMessage, setSuccessMessage] = useState('');

    const negative = useNavigate();

    const handleSignUp = async (e) =>{
        e.preventDefault();
        if(password !== confirmpassword){
            setError("Passwords do not match.");
            return;
        }
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccessMessage('Account created successfully! Redirecting to sign-in...');

            setTimeout(() => {
                setSuccessMessage('');
                negative('/');
            }, 2000);
        }catch(err){
            let message = 'An error occurred. Please try again.';
            if (err.code === 'auth/email-already-in-use') message = 'Email is already in use.';
            if (err.code === 'auth/invalid-email') message = 'Invalid email address.';
            if (err.code === 'auth/weak-password') message = 'Password should be at least 6 characters.';
            setError(message);
        }

    }

    return (
        <>
            <dev className='auth-container'>
                {successMessage && (
                <div className="success-banner">
                    {successMessage}
                </div>
                )}
                <form onSubmit={handleSignUp} className='auth-form'>
                    <h2 className='auth-title'>Create Account</h2>
                    <p className='auth-subtitle'>Join the HelpHub community</p>

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
                    <input 
                        type='password'
                        placeholder='Confirm password'
                        value={confirmpassword}
                        required
                        className='auth-input'
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <button type='submit' className='auth-button'>Sign Up</button>
                    {error && <p style={{color: 'red'}} className='auth-error'>{error}</p>}
                    <p className='auth-subtext'>
                        Already have an account? <Link to="/" className='auth-link'>Sign in</Link>
                    </p>
                </form>
            </dev>
        </>
    )


}

export default SignUp;