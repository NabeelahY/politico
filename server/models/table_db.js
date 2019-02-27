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
        party_name VARCHAR(128) NOT NULL UNIQUE,
        hqaddress VARCHAR(128) NOT NULL,
        logourl VARCHAR(128) NOT NULL,
        created_at TIMESTAMP,
        updated_at TIMESTAMP DEFAULT NULL
      );
      CREATE TABLE IF NOT EXISTS
      offices(
        office_id SERIAL PRIMARY KEY,
        type VARCHAR(128) NOT NULL,
        office_name VARCHAR(128) NOT NULL UNIQUE,
        created_at TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        othername VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        phonenumber VARCHAR(50) UNIQUE NOT NULL,
        passporturl VARCHAR(128),
        password VARCHAR(128) NOT NULL,
        isadmin BOOLEAN,
        created_date TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS
      candidates(
        id SERIAL UNIQUE,
        office INTEGER REFERENCES offices(office_id) NOT NULL,
        party INTEGER REFERENCES parties(id) NOT NULL,
        candidate INTEGER REFERENCES users(id) NOT NULL UNIQUE,
        created_at TIMESTAMP,
        PRIMARY KEY(id, office)
        );
      CREATE TABLE IF NOT EXISTS
      vote(
       id SERIAL,
       created_at TIMESTAMP NOT NULL,
       created_by INTEGER REFERENCES users(id) NOT NULL,
       office INTEGER REFERENCES offices(office_id) NOT NULL,
       candidate INTEGER REFERENCES candidates(id) NOT NULL,
       PRIMARY KEY(created_by, office)
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
  const tableQuery = 'DROP TABLE IF EXISTS parties, offices, users, candidates, vote';
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
