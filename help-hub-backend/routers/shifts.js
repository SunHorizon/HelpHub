const express = require('express');
const Shift = require('../models/Shifts')


const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const {eventId, startDateTime, endDateTime, spots, role} = req.body;
    
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