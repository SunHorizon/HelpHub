import React, { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContexts';
import Eventform from '../components/EventForm';
import './OrganizerDashboard.css'
import axios from 'axios'
import EventCard from '../components/EventCard';

const OrganizerDashboard = () => {
    const { user } = useUser();
    const [showForm, setShowForm] = useState(false);
    const [event, setEvents] = useState([]);

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
    })

    const fetchEvents = () => {
       axios.get(`http://localhost:5000/api/events/organizer/${user?.uid}`)
       .then(res => setEvents(res.data))
       .catch(err => console.error('Failed to refresh events:', err));
       setShowForm(false);
    }

    return (
        <div className='organizer-dashboard'>
            <h1>Your Events</h1>

            <button onClick={toggleForm} className='reate-event-btn'>
                {showForm ? 'Close Event Form' : 'Create New Event'}
            </button>
            {showForm && <Eventform organizerId={user?.uid} onEventCreated={fetchEvents}/>}

            <div className='event-list'>
                {event.length > 0 ? (
                    event.map(event => (
                        <EventCard 
                            key={event._id}
                            title={event.title}
                            description={event.description}
                            datetimeStart={event.datetimeStart}
                            datetimeEnd={event.datetimeEnd}
                            contactEmail={event.contactEmail}
                            imageUrl={event.imageUrl}
                        />
                    ))
                ) : (
                    <p>No events yet.</p>
                )}
            </div>
        </div>
    )
}

export default OrganizerDashboard;