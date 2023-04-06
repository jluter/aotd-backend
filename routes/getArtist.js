const express = require('express')
const router = express.Router()
const fs = require('fs')
const app = express();
const cors = require("cors");
require("dotenv").config()
const axios = require('axios');

app.use(cors());
app.use(express.json());



//grabs first four artist results from the spotify api artist search
const handleArtistData = (data) => {
  if (typeof data !== 'object') {
    return;
  }
  
  //mapping artists to return only the values needed
  const mappedArtists = data.map((artist) => {

    //extract artist image if one exists
    let imageUrl = '';
    if (artist.images.length) {
      imageUrl = artist.images[0].url
    }

    const nameAndIdOfArtists = {
      id: artist.id,
      name: artist.name,
      image: imageUrl
    };
    
    //return from map function
    return nameAndIdOfArtists;
  })
  
  return mappedArtists;
}

const artistNameParsed = JSON.parse(fs.readFileSync('./data/artistName.json')); // artist name to search for
const searchQuery = artistNameParsed.artistName;

router.get("/", (req, res) => {

  axios.get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=artist`, {
    headers: {
      'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
    }
  })
  .then(response => {

    //writes data to artistResults.json
    fs.writeFileSync('./data/artistResults.json', JSON.stringify(response.data.artists.items));
    const selectedArtists = handleArtistData(response.data.artists.items);
    res.status(200).send(selectedArtists);
  })
  .catch(error => {
    console.log(error);
  });

})

module.exports = router