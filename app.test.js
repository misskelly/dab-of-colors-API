import request from 'supertest';
import app from './app';

const environment = process.env.NOTE_ENV || 'test';
// const configuration = require('./knexfile')[environment];
// const database = require('knex')(configuration);
// 



describe('Server', () => {
  describe('init', () => {
    it('should return a 200 status', async () => {
      const res = await request(app).get('/');
      expect(res.status).toBe(200);
    });
  });

});

