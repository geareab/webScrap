const express = require('express');

const scraping = require('./fetchSkusData/scraping');
const mongoose = require("mongoose");

const app = express();

// usde scrpping.js to fetch all items data 
//scraping.fetchingAlphabets();

//tutorial();

mongoose
    .connect(
        "mongodb+srv://JR:E4X0vcfsOzr3fVdl@cluster0.xlknb.mongodb.net/pages?retryWrites=true&w=majority"
    )
    .then((result) => {
        console.log("db connected");
    })
    .catch((err) => console.log(err));

app.listen(3000);