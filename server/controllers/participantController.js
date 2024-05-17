const Participant = require("../models/participantModel");
const moment = require("moment");

const sendParticipant = async (req, res) => {
  try {
    const { fullName, email, dateOfBirth, heardFrom, event } = req.body;

    const participant = await Participant.create({
      fullName,
      email,
      dateOfBirth,
      heardFrom,
      event,
    });

    res.status(200).json(participant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getParticipants = async (req, res) => {
  try {
    const { event } = req.params;
    const { fullName, email } = req.query;

    const participants = await Participant.find({
      event: event,
      fullName: fullName ? fullName : /.*/,
      email: email ? email : /.*/,
    });

    const todayParticipants = await Participant.find({
      event: event,
      date: moment().format("YYYY-MM-DD"),
    }).countDocuments();

    res.status(200).json({ participants, todayParticipants });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { sendParticipant, getParticipants };
