import { useState, useEffect } from 'react'
import ShiftForm from './ShiftForm';
import ShiftList from './ShiftList';
import './EventCard.css'
import axios from 'axios'



function EventCard ({ event, onEdit, onDelete }){
    const [showShiftForm, setShowShiftForm] = useState(false);
    const [shifts, setShifts] = useState([]);

    const toggleShiftform = () =>{
        setShowShiftForm(prev => !prev);
    }

    useEffect(() => {
        const fetchShifts = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/api/shifts/event/${event._id}`);
                setShifts(res.data);
            } catch (error){
                console.error('Error fetching shifts:', error);
            }
        }
        fetchShifts();
    }, [event]);

    

    const handleShiftAdded = (newShift) => {
        setShifts((prevShifts) => [...prevShifts, newShift]);
        toggleShiftform();
    }

    return (
        <div className='event-card'>
            <div className='card'>
                <div className='event-details'>
                    <h2 className='event-title'>{event.title}</h2>
                    <p className='event-description'>{event.description}</p>
                    <p> <strong>Date & Time: Start</strong> {new Date(event.datetimeStart).toLocaleString()} </p>
                    <p> <strong>Date & Time: End</strong> {new Date(event.datetimeEnd).toLocaleString()} </p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Contact:</strong>  <a href={`mailto:${event.contactEmail}`}>{event.contactEmail}</a></p>
                    {event.imageUrl && <img src={event.imageUrl} alt='Event' className='event-image' />}
                </div>
                <div className='event-card-actions'>
                    <button className='event-button edit' onClick={() => onEdit(event)}>Edit</button>
                    <button className='event-button delete' onClick={() => onDelete(event._id)}>Delete</button>
                   
                </div>

                
            </div>
            <div>
                <ShiftList shifts={shifts} />
                <button className='shift-button shift' onClick={toggleShiftform}>
                    {showShiftForm ? 'Hide Shifts': "Add Shifts"}
                </button>
                {showShiftForm &&  <ShiftForm eventId={event._id} onShiftCreated={handleShiftAdded} />}
            </div>
        </div>
    )


}

export default EventCard;
