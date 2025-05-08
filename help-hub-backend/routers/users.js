const express = require('express');


const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {

    const { uid, email, role } = req.body;
    try{
        const newUser = new User({ uid, email, role });
        await newUser.save();
        res.status(201).json({ message: 'User Saved'});
    }catch(err){
        res.status(500).json({ message: 'Server error'});
    }
});

router.get('/:uid', async ( req, res) => {
    try{
        const user = await User.findOne({ uid: req.params.uid});
        if(!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    }catch (err){
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;