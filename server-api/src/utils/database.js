const { Pool } = require('pg');
require('dotenv').config();

console.log(`Attempting to connect to database ${process.env.DB_NAME} at ${process.env.DB_HOST}:${process.env.DB_PORT} as user ${process.env.DB_USER}`);

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'inventory_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = pool;
