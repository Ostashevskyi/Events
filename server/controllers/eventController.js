const Event = require("../models/eventModel");

const getEvents = async (req, res) => {
  try {
    const perPage = 4;
    const { page } = req.params;
    let { sort } = req.query;

    const query = Event.find()
      .limit(perPage)
      .skip(perPage * page);

    if (sort !== "null") {
      query.sort(sort);
    }

    const events = await query.exec();

    const length = await Event.countDocuments();

    res.status(200).json({ events, length });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getEvents;
