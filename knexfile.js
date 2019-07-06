
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/palette_picker',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: "./db/migrations"
    },
    seeds: {
      directory: "./db/seeds/dev"
    }
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/palette_picker_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  }
};


// module.exports = {

//   development: {
//     client: 'pg',
//     connection: 'postgres://localhost/school',
//     migrations: {
//       directory: './db/migrations'
//     },
//     seeds: {
//       directory: './db/seeds/dev'
//     },
//     useNullAsDefault: true,
//   },

//   test: {
//     client: 'pg',
//     connection: 'postgres://localhost/school_test',
//     migrations: {
//       directory: './db/migrations'
//     },
//     seeds: {
//       directory: './db/seeds/test'
//     },
//     useNullAsDefault: true,
//   },

// };

