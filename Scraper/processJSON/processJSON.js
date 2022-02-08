const fs = require('fs')
const testData = require('./test.json');
const processStorage = require('./process-Storage');
const processOverview = require('./process-Overview');
const processBenefit = require('./process-Benefit');
const processSideeffects = require('./process-Sideeffects');




const processJson = async (info) => {


    info.storage = await processStorage.storage(info.storage)
    // info.overview = await processOverview.overview(info.overview)
    //substitues already processed
    info = await processBenefit.benefit(info)
    info.side_effects = await processSideeffects.sideeffects(info.side_effects)



    await fs.writeFile("input.json", JSON.stringify(info), function (err) {
        if (err) throw err;
        console.log('complete');
    }
    );
    return info

}

module.exports = { processJson };