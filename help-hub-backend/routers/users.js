const express = require('express');


const router = express.Router();
const User = require('../models/User');
const admin = require('../firebase');

router.post('/', async (req, res) => {
    
    const { email, role, password } = req.body;
    try{
        const response = await admin.auth().createUser({
            email,
            password
        })
        const newUser = new User({ uid: response.uid , email: response.email, role });
        await newUser.save();
        res.status(201).json({ message: 'User Saved'});
    }catch(err){
        if(err.codePrefix === 'auth'){
            res.status(207).json({err});
        }else{
            res.status(500).json({ error: 'Server error' });
        }
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