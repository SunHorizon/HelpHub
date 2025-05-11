import React from 'react'
import './EventCard.css'


function EventCard ({title, description, datetimeStart, datetimeEnd, location, contactEmail, imageUrl}){

    return (
        <div className='event-card'>
            <div className='event-details'>
                <h2 className='event-title'>{title}</h2>
                <p className='event-description'>{description}</p>
                <p> <strong>Date & Time: Start</strong> {new Date(datetimeStart).toLocaleString()} </p>
                <p> <strong>Date & Time: End</strong> {new Date(datetimeEnd).toLocaleString()} </p>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Contact:</strong>  <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
            </div>
            {imageUrl && <img src={imageUrl} alt='Event' className='event-image' />}
        </div>
    )


}

export default EventCard;
