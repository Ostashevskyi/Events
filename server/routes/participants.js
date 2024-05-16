const express = require('express');
const Participant = require('../models/participantModel')

const router = express.Router();

router.post('/', async (req, res) => {
    const {firstName, secondName, email, dateOfBirth, heardFrom } = req.body;

    try {
        const participant = await Participant.create({
            firstName, secondName, email, dateOfBirth, heardFrom
        })

        res.status(200).json(participant)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router