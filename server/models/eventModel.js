const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,
    required: true,
  },
  eventDate: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
