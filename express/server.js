"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require('cors');
const router = express.Router();

router.get("/", (req, res) => {
  try {
    axios(
      `https://testnet.bscscan.com/token/0xe3d50128f5f1559346A274B714627c0596C9e182`
    ).then((response) => {
      const htmldata = cheerio.load(response.data, {
        normalizeWhitespace: true,
      });
      let holders = htmldata("#sparkholderscontainer").prev().text();
      holders = parseInt(holders.replace('addresses','').replace('address','').trim());
      res.json(holders);
    });
  }
  catch(ex) {
    res.json(0);
  } 
});


router.get("/taoists", (req, res) => {
  try {
    axios(
      `https://testnet.bscscan.com/token/0xe3d50128f5f1559346A274B714627c0596C9e182`
    ).then((response) => {
      const htmldata = cheerio.load(response.data, {
        normalizeWhitespace: true,
      });
      let holders = htmldata("#sparkholderscontainer").prev().text();
      holders = parseInt(holders.replace('addresses','').replace('address','').trim());
      res.json(holders);
    });
  }
  catch(ex) {
    res.json(0);
  }
});

app.use(bodyParser.json());
app.use(cors());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
