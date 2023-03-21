const express = require('express')
const router = express.Router()
const fs = require('fs')
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

router.post("/", (req, res) => {
    if (
      !req.body.artistName
    ) {
      return res.status(400).send("Artist name not entered");
    }
  
    console.log(req.body);

    res.send("Posted successfully");
  });

module.exports = router