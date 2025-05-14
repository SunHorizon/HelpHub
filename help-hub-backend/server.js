const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();
const userRouter = require('./routers/users');
const eventRouter = require('./routers/events');
const shiftRouter = require('./routers/shifts');

verifyToken = require("./testFirebase");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MangoDB'))
    .catch(err => console.error("MangoDB connection error:", err));


app.get('/', (req, res) => {
    res.send("Hello from HelpHub backend!");
});

// create a user profile
app.use('/api/users', userRouter);


// event router
app.use('/api/events', eventRouter);


// shift router
app.use('/api/shifts', shiftRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
