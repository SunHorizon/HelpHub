const express = require('express');
const Event = require('../models/Event')


const router = express.Router();


// Create an event
router.post('/', async (req, res) => {
    try{
        const { title, description, datetime, location, contactEmail, imageUrl, organizerId } = req.body;
        const newEvent = new Event({title, description, datetime, location, contactEmail, imageUrl, organizerId});
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully'});
    }catch (err){
        res.status(500).json({ message: 'Server error'});
    }
});

// get all the events by the organizer
router.get('/organizer/:id', async (req, res) => {
    try{
        const events = await Event.find({ organizerId: req.params.id})
        res.json(events);
    } catch (error){
        res.status(500).json({ message: 'Server error'});
    }
})

// update event
router.put('/:id', async (req, res) => {
    try{
        await Event.findByIdAndUpdate( req.params.id, req.body);
        res.json({ message: 'Event updated successfully'});
    }catch(error){
        res.status(500).json({ message: 'Server error'});
    }
})

// delete event
router.delete('/:id', async (req, res) => { 
    try{
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted successfully'});
    }catch (error){
        res.status(500).json({ message: 'Server error'});
    }
})


module.exports = router;

