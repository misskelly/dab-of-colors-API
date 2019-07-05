exports.up = function(knex) {
  return Promise.all([
    knex.schema.table('palettes', function(table) {
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('palettes', function(table) {
      table.dropTimestamps()
    })
  ]);
};

