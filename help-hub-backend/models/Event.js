const mangoose = require('mongoose');

const eventSchema = new mangoose.Schema({
    title: { type: String, required: true },
    description: String,
    datetimeStart: { type: Date, required: true},
    datetimeEnd: { type: Date, required: true},
    location: String,
    contactEmail: String,
    imageUrl: String,
    organizerId: { type:String, required: true}

}, { timestamps: true})

module.exports = mangoose.model('Event', eventSchema);

