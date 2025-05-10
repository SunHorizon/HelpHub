import React from 'react'
import { useUser } from '../contexts/UserContexts';
import Eventform from '../components/EventForm';
import './OrganizerDashboard.css'

const OrganizerDashboard = () => {
    const { user } = useUser();

    return (
        <div className='organizer-dashboard'>
            <h1>Your Events</h1>
            <Eventform organizerId={user.uid}/>
        </div>
    )
}

export default OrganizerDashboard;