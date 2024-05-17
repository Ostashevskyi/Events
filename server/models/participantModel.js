const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const participantSchema = new Schema({
  fullName: {
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
  },
  event: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: moment().format("YYYY-MM-DD"),
  },
});

module.exports = mongoose.model("Participant", participantSchema);
