import React, { useState } from "react";
import './VolunteerEventCard.css'
import ShiftListVolunteer from "./ShiftListVolunteer";


function VolunteerEventCard ( {event} ) {
    const [showShifts, setShowShifts] = useState(false);

    const {
        title,
        description,
        datetimeStart,
        datetimeEnd,
        location,
        contactEmail,
        imageUrl,
    } = event;

    return (
        <div className="volunteer-event-card">
            {imageUrl && <img src={imageUrl} alt={title} className="event-image" />}
            <div className="event-info">
                <h2>{title}</h2>
                <p>{description}</p>
                <p><strong>Location: </strong>{location}</p>
                <p><strong>Start: </strong>{new Date(datetimeStart).toLocaleString()}</p>
                <p><strong>End: </strong>{new Date(datetimeEnd).toLocaleString()}</p>
                <p><strong>Contact: </strong>{contactEmail}</p>
                <button onClick={() => setShowShifts(prev => !prev)}>
                    {showShifts ? 'Hide Shift' : 'View Available Shifts'}
                </button>
                {showShifts && <ShiftListVolunteer eventId={event._id} isVolunteer={true} />}
            </div>
        </div>
    );

}

export default VolunteerEventCard;
