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

const WebSocket = require('ws');

// Initialize a WebSocket server
const wss = new WebSocket.Server({ port: 3001 });

let dataPoints =[];

function calculateMean() {
    const sum = dataPoints.reduce((a, b) => a + b, 0);
    return (sum / dataPoints.length) || 0;
}

// Event listener for WebSocket connections
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Event listener for incoming messages 
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
    });

    ws.on('message', (massage) => {
        // Parse and add the new data point to dataPoints array
        const newDataPoint = JSON.parse(message);
        dataPoints.push(newDataPoint);

        // Calculate mean an send it back to the client
        const meanValue = calculateMean();
        ws.send(JSON.stringify({ mean: meanVaule}));
    });

    // Send random data to client at an interval
    setInterval(() => {
        const randomData = Math.floor(Math.random() * 100);
        ws.send(JSON.stringify(randomData));
    }, 1000); // 1 second interval
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
