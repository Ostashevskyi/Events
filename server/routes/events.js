const express = require('express');
const Event = require("../models/eventModel")
const getEvents = require('../controllers/eventController')

const router = express.Router();

router.get('/:page', getEvents)

module.exports = router