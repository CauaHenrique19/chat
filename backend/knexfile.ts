import { Knex } from "knex";

const config : Knex.Config = {
  client: 'postgresql',
  connection: {
    database: 'chat',
    user: 'postgres',
    password: 'caua987311363'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'src/database/migrations'
  }
  /*
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }*/
}

export default config