import React, { useState, useEffect, useRef } from 'react'
import { useUser } from '../contexts/UserContexts';
import Eventform from '../components/EventForm';
import './OrganizerDashboard.css'
import axios from 'axios'
import EventCard from '../components/EventCard';
import { auth } from "../firebase";
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const OrganizerDashboard = () => {
    const { user, setUser } = useUser();
    const [showForm, setShowForm] = useState(false);
    const [event, setEvents] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [editingForm, setEditingForm] = useState(null);


    const dropdownRef = useRef(null);  // Reference for dropdown menu
    const navigate = useNavigate();


    const toggleForm  = () => {
        setShowForm(prev => !prev);
    }

    useEffect(() => {
        const handleEvent = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/events/organizer/${user?.uid}`);
                setEvents(res.data);
            } catch (err) {
                console.error('Failed to fetch events:', err);
            }
        };
        handleEvent();
    }, [user])

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

    const fetchEvents = () => {
       axios.get(`http://localhost:5000/api/events/organizer/${user?.uid}`)
       .then(res => setEvents(res.data))
       .catch(err => console.error('Failed to refresh events:', err));
       setShowForm(false);
    }

    const handleSignOut = async () => {
        try{
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

    const handleDeleteEvent = async (eventID) => {
        try{
            await axios.delete(`http://localhost:5000/api/events/${eventID}`);
            const newEvents = event.filter(e => e._id !== eventID);
            setEvents(newEvents);
        } catch (err){
            console.log('Error deleting event:', err);
        }

    }

    const handleEdit = (event) => {
        setEditingForm(event);
        setShowForm(true);
    }

    return (
        <div>
            <header className='dashboard-header'>
                <h2>Organizer Dashboard</h2>
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

            <main className='organizer-dashboard'>     
                <h1>Your Events</h1>
                <button onClick={ () => {toggleForm(); setEditingForm(null)} } className='reate-event-btn'>
                    {showForm ? 'Close Event Form' : 'Create New Event'}
                </button>
                {showForm && 
                    <Eventform 
                        organizerId={user?.uid} 
                        eventToEdit={editingForm}
                        onEventCreatedOrUpdate={() => {
                            setEditingForm(null);
                            fetchEvents();
                        }}                                           
                    />}

                <div className='event-list'>
                    {event.length > 0 ? (
                        event.map(event => (
                            <EventCard 
                                key={event._id}
                                event={event}
                                onEdit={handleEdit}
                                onDelete={handleDeleteEvent}
                            />
                        ))
                    ) : (
                        <p>No events yet.</p>
                    )}
                </div>
            </main>
        </div>
    )
}

export default OrganizerDashboard;