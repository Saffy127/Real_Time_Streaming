// Select the 'Ingest Data' button
const ingestBtn = document.getElementById('ingest-btn');

// Initialize Websocket component that connects to websocket server.
const ws = new WebSocket('ws://localhost:3001/');

// Fired when the WebSocket is opened
ws.addEventListener('open', () => {
    console.log('WebSocket connection opened');
});

// Fired when a message is received from the WebSocket server
// Update this part of your script.js
ws.addEventListener('message', (event) => {
    const receivedData = JSON.parse(event.data);
    console.log(`Data received from server: ${receivedData}`);

    // Update the chart
    myChart.data.labels.push(new Date().toLocaleTimeString());  // Add a new label with the current time
    myChart.data.datasets[0].data.push(receivedData);  // Add the new data point

    // If too many data points, remove the oldest ones
    if (myChart.data.labels.length > 20) {
        myChart.data.labels.shift();  // Remove first label
        myChart.data.datasets[0].data.shift();  // Remove first data point
    }

    myChart.update();  // Update the chart
});


// Fired when an error occurs
ws.addEventListener('error', (error) => {
    console.log(`WebSocket Error: ${error}`);
});

// Add a click event listener 
ingestBtn.addEventListener('click', async () => {
    // Data to send 
    const data = {data: 'New Data'};

    // Make a POST request to the backend
    const response = await fetch('http://localhost:3000/ingest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    // Log the response
    console.log(await response.text());
});


// Get the canvas element
const ctx = document.getElementById('myChart').getContext('2d');

// Initialize the chart
const myChart = new Chart(ctx, {
    type: 'line',  // Chart type
    data: {
        labels: [],  // X-axis labels
        datasets: [{
            label: 'Real-time Data',
            data: [],  // Data points
            borderColor: 'rgba(75, 192, 192, 1)',  // Line color
            borderWidth: 1  // Line width
        }]
    }
});

// Manual test code
myChart.data.labels.push('Test Time');
myChart.data.datasets[0].data.push(5);
myChart.update();
