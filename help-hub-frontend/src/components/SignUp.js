import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './auth.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'


function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [error, setError] = useState('');
    const [userType, setUserType] = useState('');

    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async (e) =>{
        e.preventDefault();
        if(password !== confirmpassword){
            setError("Passwords do not match.");
            return;
        }
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setSuccessMessage('Creating Account...');

            await axios.post('http://localhost:5000/api/users', {
                uid: user.uid,
                email: user.email,
                role: userType,
            })

            setSuccessMessage('Account created successfully! Redirecting to sign-in...');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/');
            }, 3000);

        }catch(err){
            setSuccessMessage('')
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

                    <div className='form-group'>
                        <label htmlFor='userType'>User Type:</label>
                        <select  
                            value={userType} 
                            onChange={(e) => setUserType(e.target.value)} 
                            required
                            className='form-control'
                            >
                            <option value="">Select user type</option>
                            <option value="volunteer">Volunteer</option>
                            <option value="organizer">Organizer</option>


                        </select>
                    </div>

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