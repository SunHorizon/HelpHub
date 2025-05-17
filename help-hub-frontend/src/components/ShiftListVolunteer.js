import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContexts";
import axios from "axios";
import './ShiftListVolunteer.css'


function ShiftListVolunteer({ eventId, isVolunteer = false}){
    const [shifts, setShifts] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchShifts = async () => {
            try{
                const response = await axios.get(`http://localhost:5000/api/shifts/event/${eventId}`);
                setShifts(response.data);
            }catch (err){
                console.error("Error fetching shifts:", err);
            }
        }

        fetchShifts();
    }, [eventId])

    const handleSignUp =  async (shiftId) => {
        
    }

    return (
        <div className="shift_list">
            {shifts && shifts.length === 0 ? (
                <p>No Shifts available</p>
            ) : (
                shifts && shifts.map((shift) => {
                    const isFull = shift.spotsTaken >= shift.spots;
                    const alreadySignedUp = shift.volunteers?.includes(user?._id) || shift?.signedUp;

                    return (
                        <div key={shift._id} className="shift-card"> 
                            <p><strong>Role:</strong>{shift.role || 'N/A'}</p>
                            <p><strong>Start:</strong>{new Date(shift.startDateTime).toLocaleString()}</p>
                            <p><strong>End:</strong>{new Date(shift.endDateTime).toLocaleString()}</p>
                            <p><strong>Spots Left:</strong>{shift.spots - shift.spotsTaken}</p>
                            {isVolunteer && !alreadySignedUp && !isFull && (
                                <button onClick={() => handleSignUp(shift._id)}>Sign Up</button>
                            )}
                            {isVolunteer && alreadySignedUp && (
                                <p className="already-signed">You've signed up for this shift.</p>
                            )}
                            {isVolunteer && isFull && !alreadySignedUp && (
                                <p className="full-shift">This shift is full.</p>
                            )}
                        </div>
                    )
                })
            )}
        </div>
    ) 
}

export default ShiftListVolunteer;