const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();

verifyToken = require("./testFirebase");

const app = express();

app.use(cors());
const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MangoDB'))
    .catch(err => console.error("MangoDB connection error:", err));


// Routes
app.get('/', (req, res) => {
    res.send("Hello from HelpHub backend!");
});

// Routes
app.get('/testFirebase', verifyToken,  (req, res) => {
    res.json({ message: 'Secure data for ' + req.user.uid });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
