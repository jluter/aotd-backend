const express = require('express')
const router = express.Router()
const fs = require('fs')
const app = express();
const cors = require("cors");
const axios = require('axios');


app.use(cors());
app.use(express.json());


const handleAlbumData = (data) => {
  if (typeof data !== 'object') {
    return;
  }

  const mappedAlbums = data.map((album) => {
    let imageUrl = '';
    if (album.images.length) {
      imageUrl = album.images[0].url;
    };

    const albumData = {
      id: album.id,
      name: album.name,
      image: imageUrl,
      artists: album.artists
    }

    //Map function return
    return albumData;
  })

  //handleAlbumData return
  return mappedAlbums;
}

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

        //writes data to artistAlbums.json
        fs.writeFileSync('./data/artistAlbums.json', JSON.stringify(response.data.items));

        //Takes spotify API data and extracts only data we need
        const albums = handleAlbumData(response.data.items);

        res.status(200).send(albums);
    })
    .catch((error) => {
      console.log(error);
    });
//   getAlbumsById(req.body.artistId);
  // res.send("TESTING");
});
  
module.exports = router