const fs = require('fs')
const testData = require('./test.json');
const processStorage = require('./process-Storage');
const processOverview = require('./process-Overview');





const missed_dose = async (semiInfo) => {
    return semiInfo.filter(function (e) { return e }).slice(1, 2)
}


const processJson = async (info) => {


    info.storage = await processStorage.storage(info.storage)
    info.overview = await processOverview.overview(info.overview)
    info.missed_dose = await missed_dose(info.missed_dose)



    // await fs.writeFile("input.json", JSON.stringify(info), function (err) {
    //     if (err) throw err;
    //     console.log('complete');
    // }
    // );

}

module.exports = { processJson };