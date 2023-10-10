// Select the 'Ingest Data' button
const ingestBtn = document.getElementById('ingest-btn');

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
