import React from 'react'
import './EventCard.css'


function EventCard ({ event, onEdit, onDelete }){

    return (
        <div className='event-card'>
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
    )


}

export default EventCard;
