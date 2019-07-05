exports.up = function(knex) {
  return Promise.all([
    knex.schema.table('projects', function(table) {
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('projects', function(table) {
      table.dropTimestamps()
    })
  ]);
};
