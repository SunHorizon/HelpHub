import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContexts";
import axios from "axios";
import './Commitments.css'



function Commitments () {
    const [commitments, setCommitments] = useState([]);
    const { user } = useUser();

    useEffect(() =>{
        const fecthCommitments = async () => {
            try{
                const res = await axios.get(`http://localhost:5000/api/users/${user._id}/commitments`);
                setCommitments(res.data);
            }catch (err){
                console.error('Error loading commitments:', err);
            }
        }

        if(user?._id){
            fecthCommitments();
        }
    }, [user])

    return (
        <div>
            {commitments.length === 0 ? (
                <p>You have no upcoming commitments.</p>
            ) : (
                commitments.map((shift) => (
                <div key={shift._id} className="commitment-card">
                    <h3>{shift.eventId.title}</h3>
                    <p><strong>Role:</strong> {shift.role || 'N/A'}</p>
                    <p><strong>Start:</strong> {new Date(shift.startDateTime).toLocaleString()}</p>
                    <p><strong>End:</strong> {new Date(shift.endDateTime).toLocaleString()}</p>
                </div>
                ))
            )}
        </div>
    );

}

export default Commitments;