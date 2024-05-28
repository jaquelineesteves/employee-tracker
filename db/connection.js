const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres', // ! Change this to your own username
  password: 'kiwi', // ! Change this to your own password
  database: 'employeetracker_db',
  port: 5432, // Default PostgreSQL port
},
console.log(`Connected to the employeetracker_db database.`)

)
module.exports = pool;