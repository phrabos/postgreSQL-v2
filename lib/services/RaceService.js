const Race = require('../models/Race');
module.exports = class RaceService {
  static async addRace(name, location, distance) {
    const getData = await Race.add(name, location, distance)
    
    return getData
  }

  static async getAllRaces() {
    const getData = await Race.getAll()

    return getData
  }
}