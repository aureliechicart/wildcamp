require('dotenv').config();

console.log(process.env.PGPORT);

const { Pool } = require('pg');

// For development
const pool = new Pool();


module.exports = pool;

