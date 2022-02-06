const getPages = require('./getPages');
const getPage = require('./getPage');
const mongoose = require("mongoose");
const Page = require("../models/page");

const id = '61fe61fbd053fa41e203327c';


const sleep = delay => new Promise(resolve => { setTimeout(resolve, delay) }, delay)

const checkCurrentChar = async () => {
    const last = await Page.findById(id)
    return last.char.charAt(last.char.length - 1);
}

const removeCurrentChar = async () => {
    const currentChar = await Page.findById(id)
    const newString = await Page.findByIdAndUpdate(id, { "char": currentChar.char.slice(0, -1) })

    return newString
}

const checkCurrentPage = async () => {
    const last = await Page.findById(id)
    return last.page;
}

const updateCurrentPage = async () => {
    const checkCurrentPage = await Page.findById(id)
    const newPage = parseInt(checkCurrentPage.page) + 1
    await Page.findByIdAndUpdate(id, { "page": newPage })

}

const resetCurrentPage = async () => {

    await Page.findByIdAndUpdate(id, { "page": 1 })

}



const fetchingAlphabets = async () => {


    while (await checkCurrentChar()) {
        console.log(`current char :${await checkCurrentChar()}`)

        //perform function of adding pages

        const totalPages = await getPages.fetchingAlphabet(await checkCurrentChar())

        console.log(`total pages: ${await totalPages}`)

        await sleep(2000)
        for (let i = await checkCurrentPage(); i <= totalPages; i++) {

            getPage.fetchingPage(await checkCurrentChar(), i);
            console.log(`getting page:${i}, char is :${await checkCurrentChar()}`)
            await updateCurrentPage()
            await sleep(15000)
        }

        console.log("removing")
        await removeCurrentChar()
        await resetCurrentPage()
        console.log(await checkCurrentChar())
        await sleep(10000)
    }


    console.log("finished")
}





module.exports = { fetchingAlphabets };