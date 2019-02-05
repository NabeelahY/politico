import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the database');
});

const createOfficeTable = () => {
  const officeQuery = `CREATE TABLE IF NOT EXISTS
      offices(
        id UUID PRIMARY KEY,
        type VARCHAR(128) NOT NULL,
        name VARCHAR(128) NOT NULL UNIQUE,
        created_at TIMESTAMP,
        updated_at TIMESTAMP DEFAULT NULL
      )`;

  pool.query(officeQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
const dropOfficeTables = () => {
  const officeQuery = 'DROP TABLE IF EXISTS offices';
  pool.query(officeQuery)
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
  createOfficeTable,
  dropOfficeTables,
};

require('make-runnable');
