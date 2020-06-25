const request = require('supertest');
const app = require('./app').app;

describe('GET /users/6/1', () => {
  it('respond with json containing a list of all users', done => {
    request(app)
      .get('/users/6/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
describe('GET /users/6/0', () => {
  it('error when limit=0', done => {
    request(app)
      .get('/users/6/0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, done);
  });
});
describe('GET /users/count', () => {
  it('respond with json count all users', done => {
    request(app)
      .get('/users/count')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});