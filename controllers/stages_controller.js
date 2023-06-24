// DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
const { Stage } = db
const { Op } = require('sequelize')

// ENDPOINTS
stages.get('/', async (req, res) => {
  try {
    const foundStages = await Stage.findAll({
      where: { stage_name: { [Op.like] : `%${req.query.stage_name ? req.query.stage_name : ''}%` } }
    })
    res.status(200).json(foundStages)
  } catch(err) {
    console.log(err)
    res.status(500).send('ERROR GETTING ALL STAGES')
  }
})

stages.get('/:id', async (req, res) => {
  try {
    const foundStage = await Stage.findOne({ where: {stage_id: req.params.id} })
    res.status(200).json(foundStage)
  } catch(err) {
    console.log(err)
    res.status(500).send('ERROR GETTING STAGE')
  }
})

stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({message: "Created a new stage!", data: newStage})
    } catch(err) {
        console.log(err)
        res.status(500).send('ERROR CREATING STAGE')
    }
})

stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, { where: {stage_id: req.params.id} })
        res.status(200).json({ message: `Updated stage ${req.params.id}!`, data: updatedStage})
    } catch(err) {
        console.log(err)
        res.status(500).send('ERROR UPDATING STAGE')
    }
})

stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({ where: {stage_id: req.params.id} })
        res.status(200).json({ message: `Successfully deleted stage id ${req.params.id}!`})
    } catch(err) {
        console.log(err)
        res.status(500).send('ERROR DELETING STAGE')
    }
})

// EXPORT
module.exports = stages
