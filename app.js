const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs")
const path = require("path")

require("dotenv").config();

app.use(express.static(__dirname + '/client/dist'));
app.use(express.static(__dirname + '/public'));

app.use(express.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})
  
app.get("/test", function (req, res) {
  if (process.env.GOOGLE_MAPS_AUTH_TOKEN) {
    res.send("detected api key");
  } else {
    res.send("api key not detected");
  }
})

app.get("/testdata", function (req, res) {
  fs.readFile("./data/marker_data_test.json", (err, json) => {
    let obj = JSON.parse(json);
    res.json(obj);
  })
})

app.get("/testmodel", function (req, res) {
  fs.readFile("./models/pin.gltf", (err, json) => {
    let obj = JSON.parse(json);
    res.json(obj);
  })
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("express server started at port " + port);
});
