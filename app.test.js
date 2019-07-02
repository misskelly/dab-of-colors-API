import request from 'supertest';
import app from './app';

const environment = process.env.NOTE_ENV || 'test';
// const configuration = require('./knexfile')[environment];
// const database = require('knex')(configuration);
// 

describe('Dummy', () => {
  it('should return true', () => {
    expect(true).toEqual(true);
  });
});

