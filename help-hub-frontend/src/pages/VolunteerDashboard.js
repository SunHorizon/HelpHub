import React, { useEffect, useState, useRef} from "react";
import { useUser } from '../contexts/UserContexts';
import axios from 'axios'
import { auth } from "../firebase";
import { signOut } from 'firebase/auth';
import './VolunteerDashboard.css'
import { useNavigate } from 'react-router-dom';
import VolunteerEventCard from "../components/VolunteerEventCard";
import Commitments from "../components/Commitments";


const VolunteerDashboard = () => {
    const { user, setUser } = useUser();
    const [ event, setEvents] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef(null);  // Reference for dropdown menu
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try{
                const response = await axios.get("http://localhost:5000/api/events/available");
                setEvents(response.data);
            } catch (error){
                console.error('Error fetching events:', error);
            }
        }
        fetchEvents();
    }, [])

    // Handle outside click to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const handleSignOut = async () => {
        try{
            console.log("sign out")
            await signOut(auth);
            setUser(null); 
            
        } catch (error){
            console.error('Logout failed:', error);
        }
    };

    useEffect(() => {
        if(!user){
            const timeout = setTimeout(() => {
                navigate('/');
            }, 500)
            return () => clearTimeout(timeout); // Cleanup in case component unmounts early    
        } 
    }, [user, navigate])
    

    return (
        <div>
            <header className='dashboard-header'>
                <h2>Volunteer Dashboard</h2>
                <div className='user-selection' onClick={() => setShowDropdown(prev => !prev)} title='Logout'>
                    <img
                        src='https://upload.wikimedia.org/wikipedia/commons/a/ad/Humanmusic_red.png'
                        alt='User Profile'
                        className='user-icon'
                    />
                    {showDropdown && (
                        <div className='dropdown-menu' ref={dropdownRef} > 
                            <button onClick={handleSignOut}>Logout</button>
                        </div>
                    )}
                </div>
            </header>

            <main className="volunteer-dashbaord">
                <h1>Available Events</h1>
                {event.map(event => (
                    <VolunteerEventCard  key={event._id} event={event}/>
                ))}
                <hr />
                <h2>Your Commitments</h2>
                <Commitments />
            </main>
        </div>
    )
}

export default VolunteerDashboard;