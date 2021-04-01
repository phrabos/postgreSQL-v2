const Race = require('../models/Race');
module.exports = class RaceService {
  static async addRace(name, location, distance) {
    const newRace = await Race.add(name, location, distance)
    
    return newRace
  }
}