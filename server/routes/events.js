const express = require('express');
const Event = require("../models/eventModel")

const router = express.Router();

// GET all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find()

        res.status(200).json(events)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router