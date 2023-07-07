const express = require('express')
const router = express.Router()
const fs = require('fs')
const app = express();
const cors = require("cors");
const axios = require('axios');


app.use(cors());
app.use(express.json());

router.get("/", (req, res) => {
    // if (
    //     !req.body.album
    //   ) {
    //     return res.status(400).send("Not all necessary data was included.");
    // }

    const albumList = fs.readFileSync('./data/albumsOfTheDay.json');

    res.status(200).send(albumList)
});

module.exports = router