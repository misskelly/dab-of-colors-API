const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const environment = process.env.NODE_ENV || 'development';
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
app.get('/api/v1/projects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await database('projects').where('id', projectId);
    if (!project.length) {
      res.status(404).json(`Sorry, no project found with id ${id}.`)
    } 
    res.status(200).json({
      id: project[0].id,
      name: project[0].name
    });
  } catch (error) {
      res.status(500).json(`Oh no, something bad happened and I could not get that project: ${error}`);
  }
});

// POST
// /api/v1/projects



// PUT
// /api/v1/projects/:id



// DELETE
// /api/v1/projects/:id



module.exports = app;