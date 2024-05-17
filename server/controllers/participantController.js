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

module.exports = sendParticipant;
