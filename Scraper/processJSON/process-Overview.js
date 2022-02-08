
//complete deletes first element is it has less than 5 words
const overview = async (semiInfo) => {
    //const regex = new RegExp('^' + 'storage', 'i');
    const semiInfoNonEmpty = semiInfo.filter(function (e) { return e });
    let storageIndex = 0;
    if (semiInfoNonEmpty[0].split().length < 5) {
        semiInfoNonEmpty.shift()
    }

    return (semiInfoNonEmpty ? semiInfoNonEmpty : "")
}

module.exports = { overview };