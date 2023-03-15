const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

require("dotenv").config()

const PORT = process.env.PORT || 5050;
const welcome = `Welcome to ${PORT}`;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send(welcome);
});

app.listen(PORT, function() {
    console.log(`🚨 Server ${PORT} Started`)
});