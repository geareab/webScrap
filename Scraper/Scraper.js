const puppeteer = require('puppeteer')
const { Page, PageEmittedEvents } = require('puppeteer')

const processJSON = require('./processJSON/processJSON')
const minimal_args = ['--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
    "--disable-gpu",
];


const connectPuppeteer = async () => {
    return await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/chromium-browser',
        args: minimal_args
    })
}




const scrapMedicine = async (slug) => {
    let info = {}
    const browser = await connectPuppeteer()
    console.log("launched puppeteer")

    const page = await browser.newPage()

    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (['image', 'stylesheet', 'font', 'script', 'media'].indexOf(request.resourceType()) !== -1) {
            request.abort();
        } else {
            request.continue();
            console.log(request.url())
        }
    });
    const t0 = performance.now();

    await page.goto(`https://www.1mg.com/drugs/${slug}`)

    const t1 = performance.now();

    //await page.screenshot({ path: 'page.png', fullPage: true, waitUntil: 'networkidle2' })
    const fetchInfo = await page.evaluate(() => {
        let info = {}
        let storage = document.getElementById("drug_header")
        info.storage = (storage ? storage.innerText : "").split("\n");

        let overview = document.getElementById("overview")
        info.overview = (overview ? overview.innerText : "").split("\n");

        let missed_dose = document.getElementById("missed_dose")
        info.missed_dose = (missed_dose ? missed_dose.innerText : "").split("\n");

        let uses_and_benefits = document.getElementById("uses_and_benefits")
        info.uses_and_benefits = (uses_and_benefits ? uses_and_benefits.innerText : "").split("\n");

        let side_effects = document.getElementById("side_effects")
        info.side_effects = (side_effects ? side_effects.innerText : "").split("\n");

        let how_to_use = document.getElementById("how_to_use")
        info.how_to_use = (how_to_use ? how_to_use.innerText : "").split("\n");

        let how_drug_works = document.getElementById("how_drug_works")
        info.how_drug_works = (how_drug_works ? how_drug_works.innerText : "").split("\n");

        let safety_advice = document.getElementById("safety_advice")
        info.safety_advice = (safety_advice ? safety_advice.innerText : "").split("\n");

        let substitutes = document.getElementById("substitutes")
        info.substitutes = (substitutes ? substitutes.innerText : "").split("\n");

        let expert_advice = document.getElementById("expert_advice")
        info.expert_advice = (expert_advice ? expert_advice.innerText : "").split("\n");

        let fact_box = document.getElementById("fact_box")
        info.fact_box = (fact_box ? fact_box.innerText : "").split("\n");

        let drug_interaction = document.getElementById("drug_interaction")
        info.drug_interaction = (drug_interaction ? drug_interaction.innerText : "").split("\n");

        let updateDate = document.querySelector('.style__border-bottom___2ZMDB.style__last-updated___1EMgB')
        info.updateDate = (updateDate ? updateDate.innerText : "").split("\n");
        return info
    })




    info = await fetchInfo

    await processJSON.processJson(info)



    const t2 = performance.now();

    await browser.close().then(() => {
        console.log("closed")
    })
    console.log("Call to fetch took " + (t1 - t0) + " milliseconds.");
    console.log("Call to process took " + (t2 - t0) + " milliseconds.");


}


module.exports = { scrapMedicine };