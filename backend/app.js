// Import CORS package
const cors = require('cors');

// Import the Database Connection
const db = require('./database');

// Import the Express framework
const express = require('express');
// Initialize an Express application
const app = express();
// Set the port number for the server to listen on 
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Enable JSON parsing for POST requests
app.use(express.json());


// Define a POST route for data ingestion
app.post('/ingest', (req, res) => {
    const data = req.body.data;

    // Insert the data into the SQLite database 
    db.serialize(() => {
        const stmt = db.prepare("INSERT INTO data VALUES (?)");
        stmt.run(data);
        stmt.finalize();
    });

    // Send a response 
    res.send('Data ingested');
});






// Define a route for the root URL("/") and send a response
app.get('/', (req, res) => {
    res.send('Isaac Saffran is here!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log('Server running at http://localhost:${port}/');
});

// Test database connection by inserting a record
db.serialize(() => {
    const stmt = db.prepare("INSERT INTO data VALUES (?)");
    stmt.run("Test Data");
    stmt.finalize();
});
