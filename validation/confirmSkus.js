const axios = require('axios');
const Item = require("../models/item");

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const sleep = delay => new Promise(resolve => { setTimeout(resolve, delay) }, delay)

const countSku = async (char) => {
    try {
        const response = await axios.get(`https://www.1mg.com/pharmacy_api_gateway/v4/drug_skus/by_prefix?prefix_term=${char}`)

        const data = await response;

        let totalCount = data.data.meta.total_count;

        let pages = parseInt(totalCount)
        return pages

    } catch (err) {
        // Error handling here
        return err.response
    }

}


const fetchingSkus = async () => {
    for (let char of alphabet) {
        let totalItems = 0;
        //await sleep(2000)

        await Item.find({ char: char }).then((item) => {

            item.forEach(element => {
                totalItems = totalItems + element.sku.length
            });
        })

        //console.log(await totalItems)
        await sleep(5000)
        console.log(await totalItems === await countSku(char) ? `same ${char}` : `not same ${char}`);
    }

}





module.exports = { fetchingSkus };