const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const environment = process.env.NOTE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors());

app.get('/', (request, response) => {
  response.send('Let\'s get some random color palettes!');
});

// GET

app.get('/api/v1/projects', async (req, res) => {
  try {
    const projects = await database('projects').select('id', 'name');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(`Oh no, something bad happened and I could not get the projects: ${error}`);
  }
});

// /api/v1/projects/:id


// POST
// /api/v1/projects



// PUT
// /api/v1/projects/:id



// DELETE
// /api/v1/projects/:id



module.exports = app;