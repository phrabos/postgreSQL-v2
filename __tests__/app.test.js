const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('postgreSQL-vs routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  // beforeEach(() => {
    
  // });

  it('creates a new ultramarathon in the table', async() => {
    const data = await request(app)
      .post('/api/v1/races')
      .send({
        name: 'Badwater 135',
        location: 'Death Valley',
        distance: 135
      });
    expect(data.body).toEqual({
      name: 'Badwater 135',
      location: 'Death Valley',
      distance: 135
    })
  })
});
