import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the database');
});

const createTables = () => {
  const tableQuery = `CREATE TABLE IF NOT EXISTS
      parties(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL UNIQUE,
        hqaddress VARCHAR(128) NOT NULL,
        logourl VARCHAR(128) NOT NULL,
        created_at TIMESTAMP,
        updated_at TIMESTAMP DEFAULT NULL
      );
      CREATE TABLE IF NOT EXISTS
      offices(
        id SERIAL PRIMARY KEY,
        type VARCHAR(128) NOT NULL,
        name VARCHAR(128) NOT NULL UNIQUE,
        created_at TIMESTAMP,
        updated_at TIMESTAMP DEFAULT NULL
      )`;

  pool.query(tableQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
const dropTables = () => {
  const tableQuery = 'DROP TABLE IF EXISTS parties, offices';
  pool.query(tableQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


module.exports = {
  createTables,
  dropTables,
  pool,
};

require('make-runnable');
