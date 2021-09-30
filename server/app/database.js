require('dotenv').config();

const { Pool } = require('pg');

// For development
const pool = new Pool();


module.exports = pool;

