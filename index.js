const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

require("dotenv").config()

const PORT = process.env.PORT || 5050;
const welcome = `Welcome to ${PORT}`;

const clientId = process.env.client_id;
const clientSecret = process.env.client_secret;

const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
const authEndpoint = 'https://accounts.spotify.com/api/token';

const authParams = {
    grant_type: 'client_credentials'
  };

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send(welcome);
});

app.listen(PORT, function() {
    console.log(`🚨 Server ${PORT} Started`)
});