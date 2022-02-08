const puppeteer = require('puppeteer')
const evaluate = require('./evaluate')
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

const openBrowser = async () => {
    const browser = await connectPuppeteer()
    console.log("launched puppeteer browser")
    return browser;
}

const closeBrowser = async (browser) => {
    await browser.close().then(() => {
        console.log("closed browser")
    })
}

const scrapMedicine = async (slug, browser) => {
    let info = {}
    //const browser = await openBrowser()


    const page = await browser.newPage()
    console.log("new Page Opened")
    //load only html
    await page.setRequestInterception(true);
    await page.on('request', (request) => {
        if (['image', 'stylesheet', 'font', 'script', 'media'].indexOf(request.resourceType()) !== -1) {
            request.abort();
        } else {
            request.continue();
        }
    });


    await page.goto(`https://www.1mg.com${slug}`)


    //await page.screenshot({ path: 'page.png', fullPage: true, waitUntil: 'networkidle2' })
    const fetchInfo = await evaluate.pageEvaluate(page)


    info = await fetchInfo

    info = await processJSON.processJson(info)
    await page.close().then(() => {
        console.log("page closed")
    })


    return info

}


module.exports = { scrapMedicine, closeBrowser, openBrowser };