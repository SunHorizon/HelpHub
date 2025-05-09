import React from 'react'
import { useUser } from '../contexts/UserContexts';

const OrganizerDashboard = () => {
    const { user } = useUser();

    return (
        <div style={{padding: '2rem'}}>
            <h1>Welcome, Organize!r</h1>
            <p>Manage your events here</p>

            <h1>Welcome, {user?.email}</h1>
            <p>Your role is: {user?.role}</p>
        </div>
    )
}

export default OrganizerDashboard;