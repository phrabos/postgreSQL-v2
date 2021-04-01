const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const RaceService = require('../lib/services/RaceService');

describe('postgreSQL-vs routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(() => {
    RaceService.addRace('Pinellas Trail Challenge', 'St. Pete, FL', 46)
    RaceService.addRace('Daytona 100', 'Daytona Beach, FL', 100)
  });

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

  it('gets all ultramarathons from the table', async() => {
    const data = await request(app)
      .get('/api/v1/races')

    expect(data.body).toEqual([
      {
      id: expect.any(String),
      name: expect.any(String),
      location: expect.any(String),
      distance: expect.any(Number)
      },
      {
        id: expect.any(String),
        name: expect.any(String),
        location: expect.any(String),
        distance: expect.any(Number)
      },
      ])
  })
  it('gets a single ultramarathon by id from the table', async() => {
    const data = await request(app)
      .get('/api/v1/races/2')

    expect(data.body).toEqual(
      {
      name: expect.any(String),
      location: expect.any(String),
      distance: expect.any(Number)
      },
      )
  })
  it('updates a single ultramarathon by id in the table', async() => {
    const data = await request(app)
      .put('/api/v1/races/2')
      .send({name: 'Hard Rock', location: 'Silverton, CO', distance: 100})

    expect(data.body).toEqual(
      {
      name: expect.any(String),
      location: expect.any(String),
      distance: expect.any(Number)
      },
      )
  })
});
