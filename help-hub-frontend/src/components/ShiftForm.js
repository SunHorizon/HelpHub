import { useState } from 'react';
// import axios from 'axios';

import './ShiftForm.css';
import axios from 'axios';



function ShiftForm({ eventId, onShiftCreated, eventStartDate, eventEndDate }) {
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

        const start = new Date(formData.startDateTime);
        const end = new Date(formData.endDateTime);
        const eventStart = new Date(eventStartDate);
        const eventEnd = new Date(eventEndDate);

        if(start >= end){
            alert('Shift start time must be before end time');
            return;
        }
        if(start < eventStart || end > eventEnd){
            alert(`Shift times must be within the event's date range`);
            return;
        }

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

    function formatDatetimeLocal(dateString) {
        const date = new Date(dateString);
        const offset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - offset * 60000);
        return localDate.toISOString().slice(0, 16); // "yyyy-MM-ddTHH:mm"
    }

    return (
        <form onSubmit={handleSubmit} className='shift-form'>
            <label>
                Start Date & time<br/>
                <input
                    type='datetime-local'
                    name='startDateTime'
                    value={formData.startDateTime}
                    onChange={handleChange}
                    min={formatDatetimeLocal(eventStartDate)}
                    max={formatDatetimeLocal(eventEndDate)}
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
                    min={formatDatetimeLocal(eventStartDate)}
                    max={formatDatetimeLocal(eventEndDate)}
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