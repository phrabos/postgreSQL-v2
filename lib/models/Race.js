const { query } = require('../utils/pool');
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
  
  static async getSingle(id) {
    const data = await pool.query(
      `SELECT * FROM ultramarathons
      WHERE id = $1`, [id]
    )
    return new Race(data.rows[0])
  }

  static async updateSingle(id, name, location, distance) {
    const data = await pool.query(
      `UPDATE ultramarathons
      SET  name=$2, location=$3, distance=$4
      WHERE id = $1
      RETURNING *`, [id, name, location, distance]
    )
    return new Race(data.rows[0])
  }

  static async deleteSingle(id) {
    const data = await pool.query(
      `DELETE from ultramarathons
      WHERE id = $1
      RETURNING *`, [id]
    )
    return new Race(data.rows[0])
  }
}