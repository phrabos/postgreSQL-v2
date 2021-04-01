const pool = require('../utils/pool');

module.exports = class Race {
  name;
  location;
  distance;

  constructor(row) {
    this.name = row.name,
    this.location = row.location,
    this.distance = row.distance
  }

  static async add(name, location, distance) {
    const data = await pool.query(
      `INSERT INTO ultramarathons (name, location, distance)
      VALUES ($1, $2, $3)
      RETURNING *`, [name, location, distance]
    )
    return new Race(data.rows[0])
  }

  static async getAll() {
    const data = await pool.query(
      `SELECT * FROM ultramarathons`
    )
    return data.rows
  }
  
}