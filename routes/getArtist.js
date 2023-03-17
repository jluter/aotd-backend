const express = require('express')
const router = express.Router()
const fs = require('fs')
const app = express();
const cors = require("cors");
require("dotenv").config()

app.use(cors());
app.use(express.json());

const axios = require('axios');

const searchQuery = 'angel olson'; // artist name to search for

axios.get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=artist`, {
  headers: {
    'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
  }
})
.then(response => {
  console.log(response.data.artists.items);
})
.catch(error => {
  console.log(error);
});