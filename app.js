const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const environment = process.env.NOTE_ENV || 'test';
// const configuration = require('./knexfile')[environment];
// const database = require('knex')(configuration);

app.use(bodyParser.json())

app.get('/', (request, response) => {
  response.send('Let\'s get some random color palettes!');
});

// GET
// /api/v1/projects
// /api/v1/projects/:id


// POST
// /api/v1/projects



// PUT
// /api/v1/projects/:id



// DELETE
// /api/v1/projects/:id



module.exports = app;