const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const environment = process.env.NOTE_ENV || 'test';
// const configuration = require('./knexfile')[environment];
// const database = require('knex')(configuration);


app.get('/', (request, response) => {
  response.send('We\'re going to test all the routes!');
});

module.exports = app;