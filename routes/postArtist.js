const express = require('express')
const router = express.Router()
const fs = require('fs')
const app = express();
const cors = require("cors");
const e = require('express');

app.use(cors());
app.use(express.json());

router.post("/", (req, res) => {
    if (
      !req.body.artistName
    ) {
      return res.status(400).send("Artist name not entered");
    }

    const nameObject = {
        artistName: req.body.artistName
    };

    fs.writeFileSync('./data/artistName.json', JSON.stringify(nameObject));

    res.status(200).json(nameObject);
  });

module.exports = router