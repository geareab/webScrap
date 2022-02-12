const scraper = require('./Scraper');
const Medicine = require("../models/medicine")

const sleep = delay => new Promise(resolve => { setTimeout(resolve, delay) }, delay)


const updateById = async (res) => {


    console.log(res.length)
    const browser = await scraper.openBrowser()
    for (const r of res) {
        const t0 = performance.now();
        let data = await scraper.scrapMedicine(r.slug, browser)
        let update = await { data: data, hasData: true }
        let filter = { id: r.id };
        await Medicine.findOneAndUpdate(filter, update).then(() => {
            console.log(`success:${r.id}`);
        });

        const t2 = performance.now();
        console.log("saving took " + (t2 - t0) + " milliseconds.");
        console.log("sleeping for 0.2 sec")
        await sleep(200)
    }



    await scraper.closeBrowser(browser)
}


module.exports = { updateById }