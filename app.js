const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const cors = require('cors');

require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send("Let's get some random color palettes!");
});

// GET

// all projects
// /api/v1/projects
app.get('/api/v1/projects', async (req, res) => {
  try {
    const projects = await database('projects').select('id', 'name');
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json(
        `Oh no, something bad happened and I could not get the projects: ${error}`
      );
  }
});

// single project
// /api/v1/projects/:id
app.get('/api/v1/projects/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const project = await database('projects').where({ id });
    if (!project.length) {
      return res.status(404).json(`Sorry, no project found with id ${id}.`);
    }
    res.status(200).json({
      id: project[0].id,
      name: project[0].name
    });
  } catch (error) {
    res
      .status(500)
      .json(
        `Oh no, something bad happened and I could not get that project: ${error}`
      );
  }
});

// all palettes
// /api/v1/palettes
app.get('/api/v1/palettes', async (req, res) => {
  try {
    const { name } = req.query;
    if (req.query.name) {
      database('palettes')
        .where('name', name)
        .then(palette => {
          if (palette) {
            return res.status(200).json(palette);
          } else {
            return res.status(404).json('Palettes Not Found');
          }
        });
    } else {
      const palettes = await database('palettes').select();
      if (!palettes.length) return res.status(404).json('Palettes Not Found');
      res.status(200).json(palettes);
    }
  } catch (error) {
    res
      .status(500)
      .json(
        `Oh no, something bad happened and I could not get all the palettes: ${error}`
      );
  }
});

// single palette
//'/api/v1/palettes/:id'
app.get('/api/v1/palettes/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const foundPalette = await database('palettes').where({ id });
    if (!foundPalette.length) return res.status(404).json('Palette Not Found');
    res.status(200).json(foundPalette[0]);
  } catch (error) {
    res
      .status(500)
      .json(
        `Oh no, something bad happened and I could not find that palette: ${error}`
      );
  }
});

// POST
// /api/v1/projects
app.post('/api/v1/projects', async (req, res) => {
  try {
    const project = req.body;
    if (!project.name)
      return res.status(422).send({
        error: 'Expected format {  name: <String> }'
      });
    const projectId = await database('projects').insert(project, 'id');
    res.status(201).json({
      id: projectId[0]
    });
  } catch (error) {
    res
      .status(500)
      .json(
        `Oh no, something bad happened and I could not add that project: ${error}`
      );
  }
});

// add new palette
//'/api/v1/palettes'
app.post('/api/v1/palettes', async (req, res) => {
  try {
    const palette = req.body;
    const required = [
      'name',
      'color_1',
      'color_2',
      'color_3',
      'color_4',
      'color_5',
      'project_id'
    ];
    for (let param of required) {
      if (!palette[param]) {
        res.status(422).json({
          error: `Expected format {
        name: <String>,
        color_1: <Valid Hex #>,
        color_2: <Valid Hex #>,
        color_3: <Valid Hex #>,
        color_4: <Valid Hex #>,
        color_5: <Valid Hex #>,
        project_id: <Number>
      }, Missing ${param}`
        });
        return;
      }
    }
    const [id] = await database('palettes').insert(palette, 'id');
    res.status(201).json({ id });
  } catch (error) {
    res
      .sendStatus(500)
      .json(
        `Oh no, something bad happened and I could not add that palette: ${error}`
      );
  }
});

// PATCH

// edit project
// '/api/v1/projects/:id'
app.patch('/api/v1/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const matchingProjects = await database('projects').where({ id });
    if (!matchingProjects.length)
      return res
        .status(404)
        .json(`Uh oh, could not find project with id: ${id}.`);
    if (!name)
      return res.status(422).json('Required format: { name: <String> }');
    await database('projects')
      .where({ id })
      .update({ name });
    res.status(202).json('Successfully edited that project name');
  } catch (error) {
    res
      .status(500)
      .json(
        `Oh no, something bad happened and I could not update that project: ${error}`
      );
  }
});

// edit palette
// '/api/v1/palettes/:id'
app.patch('/api/v1/palettes/:id', async (req, res) => {
  try {
    const modifiedPalette = req.body;
    for (let param of [
      'name',
      'color_1',
      'color_2',
      'color_3',
      'color_4',
      'color_5'
    ]) {
      if (!modifiedPalette[param])
        return res.status(422).json({
          error: `Expected format {
        name: <String>,
        color_1: <Valid Hex #>,
        color_2: <Valid Hex #>,
        color_3: <Valid Hex #>,
        color_4: <Valid Hex #>,
        color_5: <Valid Hex #>,
      }, Missing ${param}`
        });
    }
    const { id } = req.params;
    const matchingPalettes = await database('palettes').where({ id });
    if (!matchingPalettes.length)
      return res.status(404).json(`Bummer, no palette found with id ${id}`);
    await database('palettes')
      .where({ id })
      .update({ ...modifiedPalette });
    return res.status(202).json(`Palette successfully updated`);
  } catch (error) {
    res
      .status(500)
      .json(
        `Oh no, something bad happened and I could not get the palettes: ${error}`
      );
  }
});

// DELETE

// delete project and associated palette(s)
app.delete('/api/v1/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const projectToDelete = await database('projects')
      .where('id', parseInt(id))
      .select();

    if (!projectToDelete.length) {
      return res.status(404).json(`No project found with the id of ${id}.`);
    }
    await database('palettes')
      .where('project_id', id)
      .del();
    await database('projects')
      .where({ id })
      .del();
    res.status(202).json('Project successfully deleted');
  } catch (error) {
    res
      .status(500)
      .json(
        `Oh no, something bad happened and I could not delete the project: ${error}`
      );
  }
});

// delete palette
app.delete('/api/v1/palettes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const matchingPalettes = await database('palettes').where({ id });
    if (!matchingPalettes.length)
      return res
        .status(404)
        .json({ error: `Aw snap. Palette ${id} doesn\'t seem to exist` });
    await database('palettes')
      .where({ id })
      .del();
    return res.status(202).json(`Successfully deleted palette ${id}`);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Aw snap. Could not delete palette ${id}` });
  }
});

module.exports = app;
