const mangoose = require('mongoose');

const userSchema = new mangoose.Schema({
    uid: { type: String, required: true, unique: true },
    email: {type: String, required: true},
    role: { type: String, enum: ['volunteer', 'organizer'], required: true},
})

module.exports = mangoose.model('User', userSchema);

