const axios = require('axios');
const Item = require("../models/item");
const Medicine = require("../models/medicine");

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];


const sleep = delay => new Promise(resolve => { setTimeout(resolve, delay) }, delay)

const fetchingSkus = async () => {
    console.log(await "finding")


    for (let char of alphabet) {
        console.log(char)
        const item = await Item.find({ char: char }).lean();
        console.log("items found")
        let total = 0;
        await item.forEach(async element => {
            await element.sku.forEach(async e => {
                const medicine = await new Medicine({
                    is_discontinued: e.is_discontinued,
                    manufacturer_name: e.manufacturer_name,
                    type: e.type,
                    price: e.price,
                    name: e.name,
                    id: e.id,
                    sku_id: e.sku_id,
                    available: e.available,
                    pack_size_label: e.pack_size_label,
                    rx_required: e.rx_required,
                    slug: e.slug,
                    short_composition: e.short_composition,
                    image_url: e.image_url,
                    in_stock: e.in_stock,
                    quantity: e.quantity
                });
                await medicine.save(function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        total++
                        console.log(`save char ${char}: number =>${total}`)

                    }
                })

            });
        });
    }



    // await item.forEach(element => {
    //     element.sku.forEach(async e => {
    //         console.log(e.name)
    //         const medicine = await new Medicine({
    //             //     is_discontinued: e.is_discontinued,
    //             //     manufacturer_name: e.manufacturer_name,
    //             //     type: e.type,
    //             //     price: e.price,
    //             name: e.name,
    //             //     id: e.id,
    //             //     sku_id: e.sku_id,
    //             //     available: e.available,
    //             //     pack_size_label: e.pack_size_label,
    //             //     rx_required: e.rx_required,
    //             //     slug: e.slug,
    //             //     short_composition: e.short_composition,
    //             //     image_url: e.image_url,
    //             //     in_stock: e.in_stock,
    //             //     quantity: e.quantity
    //         });

    //         await medicine.save(function (err, result) {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             else {
    //                 console.log("result")
    //             }
    //         })
    //     });

    // });


    await sleep(5000)


}


module.exports = { fetchingSkus };