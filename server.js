// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
var corsOptions = {
    origin: '*', // allows for all clients
}

app.use(cors(corsOptions));

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`SERVER is RUNNING at port ${PORT}`)
});

app.post('/post-data', (req, res) => {
    projectData.push(req.body)
    res.send({code: 200, message: 'Data posted'})
});

app.get('/get-data', (req, res) => {
    res.send(projectData[projectData.length - 1]);
});

