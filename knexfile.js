module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/colorsdb',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
