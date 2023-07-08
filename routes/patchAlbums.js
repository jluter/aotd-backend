const express = require('express')
const router = express.Router()
const fs = require('fs')
const app = express();
const cors = require("cors");
const axios = require('axios');


app.use(cors());
app.use(express.json());

router.patch("/", (req, res) => {
    if (
        !req.body.album
      ) {
        return res.status(400).send("Not all necessary data was included.");
    }

    //Take existing albums of the day from albumsOfTheDay.json and update them
    const existingAlbumsJSON = fs.readFileSync('./data/albumsOfTheDay.json', 'utf-8');
    const existingAlbums = existingAlbumsJSON ? JSON.parse(existingAlbumsJSON) : [];
    //TODO: Possibly add a check to see if an album already exists?
    existingAlbums.push(req.body.album);
    const updatedAlbums = JSON.stringify(existingAlbums);
    fs.writeFileSync('./data/albumsOfTheDay.json', updatedAlbums);

    res.status(200).send('Albums of the Day updated successfully')
});

module.exports = router