const express = require('express')
const router = express.Router()
const fs = require('fs')
const app = express();
const cors = require("cors");
const axios = require('axios');


app.use(cors());
app.use(express.json());

// const getAlbumsById = (idParam) => {
//   // axios.get(`https://api.spotify.com/v1/albums/`, {
//   //     headers: {
//   //         'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
//   //       }
//   // })
//   // .then(response => {
//   //     console.log(response.data);
//   // })
//   // .catch(error => {
//   //     console.log(error.message);
//   // })
// };

router.post("/", (req, res) => {
  if (!req.body.artistId) {
    return res.status(400).send("Error retrieving artist by ID");
  }


  axios
    .get(`https://api.spotify.com/v1/artists/${req.body.artistId}/albums?market=ES`, {
      headers: {
        Authorization: "Bearer " + process.env.ACCESS_TOKEN,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  console.log("ID!!!", req.body.artistId);
//   getAlbumsById(req.body.artistId);
  res.send("TESTING");
});
  
module.exports = router