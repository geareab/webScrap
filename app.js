const express = require('express');
const mongoose = require("mongoose");
const fs = require("fs");
const axios = require("axios");



const scraping = require('./fetchSkusData/scraping');
const validation = require('./validation/confirmSkus');
const sku2item = require('./sku2item/sku2item');
const scraper = require('./Scraper/Scraper');
const Medicine = require("./models/medicine")
const Item = require("./models/item")

const updateById = require("./Scraper/updateById");
const { ServerResponse } = require('http');



const app = express();

const sleep = delay => new Promise(resolve => { setTimeout(resolve, delay) }, delay)







mongoose
    .connect(
        "mongodb://mongo.geareab.com/pages",
        {
            auth: {
                username: 'max',
                password: 'secret'
            },
            authSource: "admin",
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    )
    .then((result) => {
        console.log("docker db connected ");
    })
    .catch((err) => console.log(err));


app.listen(3000);