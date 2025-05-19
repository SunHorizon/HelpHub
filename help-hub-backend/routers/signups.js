const express = require('express');
const Shift = require('../models/Shifts');


const router = express.Router();


// signup for a shift
router.post('/', async (req, res) => {
    const {userId, shiftId} = req.body;

    if(!userId || !shiftId){
        return res.status(400).json({ message: "User id and shift Id are required"});
    }

    try{
        const shift = await Shift.findById(shiftId);

        if(!shift) return res.status(404).json({ message: "Shift not found"});

        if(shift.volunteers.length > shift.spots){
            return res.status(400).json({ message: "Shift is full"});
        }

        if(shift.volunteers.includes(userId)){
            res.status(400).json({ message: "Already signed up for this shift"});
        }

        shift.volunteers.push(userId);

        await shift.save();
        console.log("Shift signed up successfully")
        res.status(201).json({ message: 'Shift created successfully', shift});
    } catch (err){
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;