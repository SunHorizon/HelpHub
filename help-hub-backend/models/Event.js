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

eventSchema.virtual('status').get(function () {
    const now = new Date();
    return now > this.datetimeEnd ? 'expired' : 'active';
})

eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

module.exports = mangoose.model('Event', eventSchema);

