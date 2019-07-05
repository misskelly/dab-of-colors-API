
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

