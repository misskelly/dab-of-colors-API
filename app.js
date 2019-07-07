const express = require('express');
const app = express();
const environment = process.env.NOTE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(express.json());



app.get('/', (request, response) => {
  response.send('We\'re going to test all the routes!');
});

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
    res.status(500).json({ error });
  }
});

app.get('/api/v1/palettes/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const foundPalette = await database('palettes').where({ id });
    if (!foundPalette.length) return res.status(404).json('Palette Not Found');
    res.status(200).json(foundPalette[0])

  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post('/api/v1/palettes', async (req, res) => {
  try {
    const palette = req.body;
    const [id] = await database('palettes').insert(palette, 'id');
    res.status(201).json({ id });
  } catch {
    res.sendStatus(500);
  }
});

app.delete('/api/v1/palettes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const matchingPalettes = await database('palettes').where({ id });
    if (!matchingPalettes.length) return res.sendStatus(404);
    await database('palettes')
      .where({ id })
      .del();
    return res.status(204).json('Palette Deleted');
  } catch (error) {
    return res.status(500).json({ error });
  }
});

app.patch('/api/v1/palettes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(422).json('Please provide a name.');
    const matchingPalettes = await database('palettes').where({ id });
    if (!matchingPalettes.length) return res.status(404).json('Palette not found.');
    await database('palettes')
      .where({ id })
      .update({ name });
    res.status(202).json('Name Updated Successfully');
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = app;
