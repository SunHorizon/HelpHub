const express = require('express');
const Shift = require('../models/Shifts')
const Event = require('../models/Event')


const router = express.Router();

router.post('/', async (req, res) => {
    try{  
        const {eventId, startDateTime, endDateTime, spots, role} = req.body;

        const event = await Event.findById(eventId);
        if(!event){
            console.log("Event not found");
            return res.status(404).json({ message: "Event not found" });
        }

        const shiftStart = new Date(startDateTime);
        const shiftEnd = new Date(endDateTime);
        if(shiftStart >= shiftEnd){
            console.log("Shift start must be before end")
           return res.status(400).json({ message: 'Shift start must be before end' });
        }
        if (shiftStart < event.datetimeStart || shiftEnd > event.datetimeEnd) {
            console.log('Shift must fall within the event\'s start and end date.');
            return res.status(400).json({ message: 'Shift must fall within the event\'s start and end date.' });
        }
    
        const shifts = new Shift({
            eventId,
            startDateTime,
            endDateTime,
            spots,
            role
        });

        await shifts.save();
        console.log("Shift created successfully")
        res.status(201).json({ message: 'Shift created successfully', shifts});
    } catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/event/:eventId', async (req, res) => {
    try{
        const shifts = await Shift.find({ eventId: req.params.eventId });
        res.json(shifts);
        console.log("Shift successfully get");
    } catch(err){
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch shifts' });
    }
})

module.exports = router;