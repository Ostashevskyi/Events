const Event = require("../models/eventModel");
var cron = require("node-cron");

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

const postEventsToDB = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.eventyay.com/v1/events?sort=identifier&filter=[]",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = await response.json();

    const array = data?.map((el) => {
      const { attributes } = el;
      return {
        title: attributes?.name,
        description: attributes?.description,
        eventDate: attributes["starts-at"],
        organizer: attributes["owner-name"],
      };
    });

    const existingEvents = await Event.find({
      $or: array.map((event) => ({
        title: event.title,
        eventDate: event.eventDate,
      })),
    });

    const existingEventSet = new Set(
      existingEvents.map((event) => `${event.title}-${event.eventDate}`)
    );

    const newEvents = array.filter(
      (event) => !existingEventSet.has(`${event.title}-${event.eventDate}`)
    );

    if (newEvents.length > 0) {
      await Event.insertMany(newEvents);
      console.log("new events posted");
    } else {
      console.log("all events are already exists");
    }
  } catch (error) {
    console.log(error.message);
  }
};

cron.schedule("0 0 * * *", () => {
  postEventsToDB();
});

module.exports = getEvents;
