
const sideeffects = async (semiInfo) => {

    await semiInfo.forEach(element => {
        if (element.discription.indexOf(element.heading) > -1) {
            element.discription.shift()
        }

    });
    return await semiInfo


}

module.exports = { sideeffects };