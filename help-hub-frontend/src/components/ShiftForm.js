import { useState } from 'react';
// import axios from 'axios';

import './ShiftForm.css';
import axios from 'axios';



function ShiftForm({ eventId, onShiftCreated}) {
    const [formData, setFormData] = useState({
        startDateTime: '',
        endDateTime: '',
        spots: '',
        role: '',
    })

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev, 
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:5000/api/shifts', {
                eventId,
                ...formData
            });
            setFormData({ datetime: '', spots: '', role: '' });
            onShiftCreated && onShiftCreated(res.data.shifts);
        } catch (error) {
            console.error('Error creating shift:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='shift-form'>
            <label>
                Start Date & time
                <input
                    type='datetime-local'
                    name='startDateTime'
                    value={formData.startDateTime}
                    onChange={handleChange}
                    required

                />
            </label>
            <label>
                End Date & time
                <input
                    type='datetime-local'
                    name='endDateTime'
                    value={formData.endDateTime}
                    onChange={handleChange}
                    required

                />
            </label>
            <label>
                Sports Available
                <input
                    type='number'
                    name='spots'
                    value={formData.spots}
                    onChange={handleChange}
                    required

                />
            </label>
            <label>
                Role 
                <input
                    type='text'
                    name='role'
                    value={formData.role}
                    onChange={handleChange}
                    required

                />
            </label>
            <button type='submit'>Add Shift</button>
        </form>
    );

}

export default ShiftForm;