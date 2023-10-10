// Import the sqlite3 package 
const sqlite3 = require('sqlite3').verbose();

// Initialize a database connection
const db = new sqlite3.Database('./mydatabase.db');

// Serialize ensures that the following sequence of operations run in a serial fashion
db.serialize(() => {
    // Create a table if it dosen't exist
    db.run("CREATE TABLE IF NOT EXISTS data (info TEXT)");
});

// Export the database connection
module.exports = db;

