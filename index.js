const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const axios = require('axios');
require("dotenv").config();

const getArtist = require('./routes/getArtist');
const postArtist = require('./routes/postArtist');
const getAlbum = require('./routes/getAlbum');

const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cors());

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

    require('dotenv').config();
    process.env.ACCESS_TOKEN = response.data.access_token;

    //Write authorization token to .env file
    const envConfig = require('dotenv').parse(fs.readFileSync('.env'));
    envConfig.ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    fs.writeFileSync('.env', Object.keys(envConfig).map(key => `${key}=${envConfig[key]}`).join('\n')); 
  })
  .catch(error => {
    console.error(error);
});

app.get("/", (req, res) => {
  res.send('welcome');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
});




app.use("/aotd", getArtist);
app.use("/aotd", postArtist);
app.use("/aotd/albums", getAlbum);

app.listen(PORT, function() {
    console.log(`🚨 Server ${PORT} Started`)
});