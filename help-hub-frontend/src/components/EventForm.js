import React, { useState } from 'react'
import './EventForm.css'
import axios from 'axios'


function Eventform ({ organizerId, onEventCreated }) {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        datetimeStart: '',
        datetimeEnd: '',
        location: '',
        contactEmail: '',
        imageUrl: null,
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        })) 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        data.append("organizerId", organizerId);

        try{
            await axios.post('http://localhost:5000/api/events', data);
            setSuccessMessage('Event created successfully!');
            onEventCreated();
            setFormData({
                title: '',
                description: '',
                datetimeStart: '',
                datetimeEnd: '',
                location: '',
                contactEmail: '',
                image: null
            });
        }catch (err) {
            console.error('Error creating event:', err);
        }

    } 

    return (
        <div className='event-form-container'>
            <h2>Create New Event</h2>
            {successMessage && <div className='success-banner'>{successMessage}</div>}
            <form onSubmit={handleSubmit} className='event-form'>
                <input type='text' name='title' placeholder='Title' value={formData.title} onChange={handleChange} required />
                <textarea name='description' placeholder='Description' value={formData.description}  onChange={handleChange} required/>
                <label>Start Event:</label>
                <input type='datetime-local' name='datetimeStart' value={formData.datetimeStart} onChange={handleChange} required />
                <label>End Event:</label>
                <input type='datetime-local' name='datetimeEnd' value={formData.datetimeEnd} onChange={handleChange} required />
                <input type='text' name='location' placeholder='Location' value={formData.location} onChange={handleChange} required/>
                <input type='email' name='contactEmail' placeholder='Contact Email' value={formData.contactEmail} onChange={handleChange} required/>
                <input type='file' name='imageUrl' accept='image/*' onChange={handleChange} />
                <button type='submit'>Create Event</button>
            </form>
        </div>

    );
}

export default Eventform


