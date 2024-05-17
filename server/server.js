require("dotenv").config();

const express = require("express");
const cors = require("cors");
const eventsRoutes = require("./routes/events");
const participantsRoutes = require("./routes/participants");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/events", eventsRoutes);
app.use("/api/participants", participantsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to db & Server is running on port ${process.env.PORT}.`
      );
    });
  })
  .catch((error) => console.log(error));
