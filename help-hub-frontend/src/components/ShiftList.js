import './ShiftList.css';


function ShiftList ({ shifts }) {

    if (shifts.length === 0) return <p>No shifts yet.</p>
    return (
        <div className="shift-list">
            <h4>Shifts</h4>
            <ul>
                {shifts.map((shift) => (
                    <li key={shift._id} className="shift-item">
                        <strong>{new Date(shift.startDateTime).toLocaleString()} - {new Date(shift.endDateTime).toLocaleString()} </strong>
                        <span>• Spots: {shift.spots}</span>
                        {shift.role && <span> • Role: {shift.role} </span>}
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default ShiftList;