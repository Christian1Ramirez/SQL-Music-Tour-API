// DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { Event } = db
const { Op } = require('sequelize')

// ENDPOINTS
events.get('/', async (req, res) => {
  try {
    const foundEvents = await Event.findAll({
      order: [ ['date', 'ASC'] ],
      where: { name: { [Op.like] : `%${req.query.name ? req.query.name : ''}%` } }
    })
    res.status(200).json(foundEvents)
  } catch(err) {
    console.log(err)
    res.status(500).send('ERROR GETTING ALL EVENTS')
  }
})

events.get('/:id', async (req, res) => {
  try {
    const foundEvent = await Event.findOne({ where: {event_id: req.params.id} })
    res.status(200).json(foundEvent)
  } catch(err) {
    console.log(err)
    res.status(500).send('ERROR GETTING EVENT')
  }
})

events.post('/', async (req, res) => {
  try {
    const newEvent = await Event.create(req.body)
    res.status(200).json({message: "Created a new event!", data: newEvent})
  } catch(err) {
    console.log(err)
    res.status(500).send('ERROR CREATING EVENT')
  }
})

events.put('/:id', async (req, res) => {
  try {
    const updatedEvents = await Event.update(
      req.body,
      { where: {event_id: req.params.id} }
    )
    res.status(200).json({ message: `Updated event id ${req.params.id}!`})
  } catch(err) {
    console.log(err)
    res.status(500).send('ERROR UPDATING EVENT')
  }
})

events.delete('/:id', async (req, res) => {
  try {
    const deletedEvents = await Event.destroy({ where: {event_id: req.params.id} })
    res.status(200).json({ message: `Successfully deleted event id ${req.params.id}!`})
  } catch(err) {
    console.log(err)
    res.status(500).send('ERROR DELETING EVENT')
  }
})

//EXPORT
module.exports = events
