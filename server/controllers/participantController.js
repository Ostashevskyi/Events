const Participant = require("../models/participantModel");

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

    res.status(200).json(participants);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { sendParticipant, getParticipants };
