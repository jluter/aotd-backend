const express = require('express')
const router = express.Router()
const fs = require('fs')
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());