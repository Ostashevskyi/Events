const express = require("express");
const sendParticipant = require("../controllers/participantController");
const router = express.Router();

router.post("/", sendParticipant);

module.exports = router;
