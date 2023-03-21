const express = require('express')
const router = express.Router()
const fs = require('fs')
const app = express();
const cors = require("cors");
require("dotenv").config()
const axios = require('axios');

app.use(cors());
app.use(express.json());

// router.put("/aotd", (req, res) => {
//   console.log(req.body);
//   res.status(200).send("PUTTEN")

// })

router.get("/", (req, res) => {
  console.log(req.body);
  console.log(res.status, "test");
  res.send("GOTTEN")

})



const searchQuery = 'angel olson'; // artist name to search for

// axios.get(`https://api.spotify.com/v1/search?q=${searchQuery}&type=artist`, {
//   headers: {
//     'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
//   }
// })
// .then(response => {
//   console.log(response.data.artists.items);
// })
// .catch(error => {
//   console.log(error);
// });

module.exports = router