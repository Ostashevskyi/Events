const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,
  },
  eventDate: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
  },
});

module.exports = mongoose.model("Event", eventSchema);
