const mangoose = require('mongoose');

const shiftSchema = new mangoose.Schema({
    eventId: { type: mangoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    startDateTime: { type: Date, required: true},
    endDateTime: { type: Date, required: true},
    spots: { type: Number, required: true },
    spotsTaken: Number,
    volunteers: [String],
    role: { type: String },

}, { timestamps: true})

module.exports = mangoose.model('Shift', shiftSchema);

