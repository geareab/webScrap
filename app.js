const express = require('express');
const mongoose = require("mongoose");
const fs = require("fs");


const scraping = require('./fetchSkusData/scraping');
const validation = require('./validation/confirmSkus');
const sku2item = require('./sku2item/sku2item');
const scraper = require('./Scraper/Scraper');
const Medicine = require("./models/medicine")
const updateById = require("./Scraper/updateById")



const app = express();


// (async function () {
//     const update = { data: await scraper.scrapMedicine("azithral-500-tablet-325616") };
//     const filter = { id: '325616' };
//     await Medicine.findOneAndUpdate(filter, update).then((res) => {
//         console.log(res);
//     });


// }())
(async function () {

    await Medicine.find({ id: { $gte: process.env.DOWN, $lt: process.env.UP }, hasData: false }).lean().then((res) => {

        //updateById.updateById(res)

    })
}())



mongoose
    .connect(
        "mongodb://max:secret@mongo.geareab.com/pages",
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