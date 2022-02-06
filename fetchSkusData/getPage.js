const axios = require('axios');
const mongoose = require("mongoose");
const Item = require("../models/item");

const fetchingPage = async (char, page) => {
    console.log(`char is ${char} adn page number is ${page}`)
    axios.get(`https://www.1mg.com/pharmacy_api_gateway/v4/drug_skus/by_prefix?prefix_term=${char}&page=${page}&per_page=50`).then((response) => {
        //console.log(response.data.data.skus)
        const sku = new Item({
            sku: response.data.data.skus,
            char: char,
            page: page
        });
        sku.save().then((result) => {
            console.log("success");
        }).catch((err) => {
            console.log(err)
        });
    })
}


module.exports = { fetchingPage };



