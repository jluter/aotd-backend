const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const axios = require('axios');
require("dotenv").config()

const PORT = process.env.PORT || 5050;
const welcome = `Welcome to ${PORT}!!!!!!!`;

app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//     res.send(welcome);
// });

const clientId = process.env.client_id;
const clientSecret = process.env.client_secret;

// The authorization endpoint URL for Spotify API
const authEndpointUrl = 'https://accounts.spotify.com/api/token';

// Encode the client ID and client secret to Base64
const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
// Define the data to send in the request body
const data = 'grant_type=client_credentials';

// Set the request headers
const config = {
  headers: {
    'Authorization': `Basic ${authHeader}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

// Make the POST request to the Spotify API to get an authorization token
axios.post(authEndpointUrl, data, config)
  .then(response => {
    console.log(response.data.access_token);

    require('dotenv').config();
    process.env.ACCESS_TOKEN = response.data.access_token;

    const envConfig = require('dotenv').parse(fs.readFileSync('.env'));
    envConfig.ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    fs.writeFileSync('.env', Object.keys(envConfig).map(key => `${key}=${envConfig[key]}`).join('\n')); 
    //this function takes the access token and makes an API request to get an album
    testFunction(response.data.access_token);
  })
  .catch(error => {
    console.error(error);
});


//test run of the app
const testFunction = (responseData) => {

    const test = {
        Authorization: `Bearer ${responseData}`
    };

    const options = {
        url: 'https://api.spotify.com/v1/albums/3CHcldbsbrBOOlw8cnLpNm',
        headers: test
    };

    axios.get(options.url, { headers: options.headers })
        .then(response => {
            console.log(response.data.images)
            const images = response.data.images;
            const jsonData = JSON.parse(JSON.stringify(images));
            return jsonData;
        })
        .then(jsonData => {
            app.get("/", (req, res) => {
                res.send(jsonData)
            }) 
        })
        .catch(error => {
            console.log(error)
        });
}




app.listen(PORT, function() {
    console.log(`🚨 Server ${PORT} Started`)
});