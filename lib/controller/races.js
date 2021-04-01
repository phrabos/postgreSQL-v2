const { Router } = require('express');
const RaceService = require('../services/RaceService');

module.exports = Router()
  .post('/', async (req, res, next) =>{
    try {
      const name = req.body.name
      const location = req.body.location
      const distance = req.body.distance
      const data = await RaceService.addRace(name, location, distance)
      res.send(data)
    } catch (err) {
      next(err)
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await RaceService.getAllRaces()
      res.send(data)
      
    } catch (err) {
      next(err)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const data = await RaceService.getRaceById(id)
      res.send(data)
    } catch (err) {
      next(err)
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const name = req.body.name
      const location = req.body.location
      const distance = req.body.distance
      const data = await RaceService.updateRaceById(id, name, location, distance)
      res.send(data)
    } catch (err) {
      next(err)
    }
  })