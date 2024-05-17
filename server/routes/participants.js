const express = require("express");
const {
  sendParticipant,
  getParticipants,
} = require("../controllers/participantController");
const router = express.Router();

router.post("/", sendParticipant);

router.get("/:event", getParticipants);

module.exports = router;
