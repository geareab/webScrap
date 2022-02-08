const express = require('express');
const mongoose = require("mongoose");

const scraping = require('./fetchSkusData/scraping');
const validation = require('./validation/confirmSkus');
const sku2item = require('./sku2item/sku2item');
const scraper = require('./Scraper/Scraper');



const app = express();


scraper.scrapMedicine("hifenac-p-tablet-64892")

// mongoose
//     .connect(
//         "mongodb+srv://JR:E4X0vcfsOzr3fVdl@cluster0.xlknb.mongodb.net/pages?retryWrites=true&w=majority"
//     )
//     .then((result) => {
//         console.log("docker db connected ");
//     })
//     .catch((err) => console.log(err));


app.listen(3000);