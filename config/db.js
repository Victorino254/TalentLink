const mysql = require('mysql2/promise');

// Create a MySQL connection
const db = mysql.createPool({
    host: process.env.DB_HOST, // Database host
    user: process.env.DB_USER, // Database user
    password: process.env.DB_PASSWORD, // Database password
    database: process.env.DB_NAME // Database name
});

// Export the connection
module.exports = db; // Ensure you are exporting the db object 