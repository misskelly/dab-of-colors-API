const seedData = require('../../seedData/seedData');

const createProjects = (knex, project) => {
  return knex('projects').insert({
    name: project.name,
  }, 'id')
  .then(project_id => {
    let palettePromises = [];

    project.palettes.forEach(palette => {
      palettePromises.push(
        createPalettes(knex, {
          name: palette.name,
          color_1: palette.colors[0],
          color_2: palette.colors[1],
          color_3: palette.colors[2],
          color_4: palette.colors[3],
          color_5: palette.colors[4],
          project_id: project_id[0]
        })
      )
    });

    return Promise.all(palettePromises);
  })
};

const createPalettes = (knex, palette) => {
  return knex('palettes').insert(palette)
};


exports.seed = (knex, Promise) => {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {

      let projectPromises = [];

      seedData.forEach(project => {
        projectPromises.push(createProjects(knex, project));
      });

      return Promise.all(projectPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
