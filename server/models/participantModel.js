const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const participantSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    secondName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    heardFrom: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Participant', participantSchema);


