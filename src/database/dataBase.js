// This file is used to connect to the PostgreSQL database using the pg library.
// It exports a pool object that can be used to query the database.
const { Pool } = require('pg');

// Create a new pool instance with the database connection details
const pool = new Pool({
    user: "myuser",
    host: "postgresql",
    database: "mydb",
    password: "mysecretpassword",
    port: 5432,
});

module.exports = pool;