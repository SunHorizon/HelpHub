import React, { useState } from 'react'
import './EventForm.css'
import axios from 'axios'


function Eventform ({ organizerId }) {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        datetime: '',
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
        try{
            await axios.post('http://localhost:5000/api/events', {
                ...formData,
                "organizerId": organizerId
            });
            setSuccessMessage('Event created successfully!');
            setFormData({
                title: '',
                description: '',
                datetime: '',
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
                <input type='datetime-local' name='datetime' value={formData.datetime} onChange={handleChange} required />
                <input type='text' name='location' placeholder='Location' value={formData.location} onChange={handleChange} required/>
                <input type='email' name='contactEmail' placeholder='Contact Email' value={formData.contactEmail} onChange={handleChange} required/>
                <input type='file' name='imageUrl' accept='image/*' onChange={handleChange} />
                <button type='submit'>Create Event</button>
            </form>
        </div>

    );
}

export default Eventform


