const Event = require("../models/eventModel");

const getEvents = async (req, res) => {
  try {
    const perPage = 4;
    const { page } = req.params;
    const { sort } = req.query;

    const events = await Event.find()
      .limit(perPage)
      .skip(perPage * page)
      .sort(sort);

    const length = await Event.countDocuments();

    res.status(200).json({ events, length });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getEvents;
