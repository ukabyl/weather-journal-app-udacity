/* Global Variables */

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const SERVER_URL = 'http://localhost:3000';
const API_KEY = '&appid=ba960daefc10c56dc6f7608b7d568c3e&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Create variables from DOM elements
const generate = document.getElementById('generate');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');

const entryHolder = document.getElementById('entryHolder');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

// Add Event Listener when we click to fetch Data and Save it to our application
generate.addEventListener('click', generateHandler);

async function generateHandler() {
    const zipCode = zip.value;
    const feelingsValue = feelings.value;
    if ( zipCode === '' || isNaN(parseInt(zipCode)) || feelingsValue === '') {
        alert('ZIP CODE MUST BE NUMBERS. Both of the fields are required.')
        return 
    }

    try{
        fetchData(zipCode, feelingsValue)
        .then((data) => transformData(data, feelingsValue))
        .then((transformedData) => postData(transformedData))
        .then(() => updateUI()) 
    } catch(e) {
        console.log(e)
    }
    
}

// Transforming data for posting to the app server
function transformData(data, content) {
    return {
        date: newDate,
        temp: data.main.temp,
        content
    }
}

// Fetching data from Weather API
async function fetchData(zipCode) {
    try{
        const response = await fetch(API_URL + zipCode + API_KEY)
        const resBody = await response.json();
        if ( resBody.cod == 404 ) {
            alert(resBody.message)
            return 
        }
        return resBody;
    } catch(e) {
        console.log(e);
    }
}

// Posting data to the server
async function postData(data) {
    const res = await fetch('/post-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

// Put the fetching data to the DOM
async function updateUI() {
    const response = await fetch('/get-data');
    const data = await response.json();
    content.innerHTML = 'Content: ' + data.content;
    date.innerHTML = 'Date: ' +  data.date;
    temp.innerHTML = 'Temperature: ' + data.temp + ' in Fahrenheit';
}