
//complete deletes first element is it has less than 5 words
const overview = async (semiInfo) => {
    //const regex = new RegExp('^' + 'storage', 'i');
    const semiInfoNonEmpty = semiInfo.filter(function (e) { return e });
    if (semiInfoNonEmpty[0].split(" ").length < 2) {
        semiInfoNonEmpty.shift()
    }
    //delete similar elements
    const uniq = [...new Set(semiInfoNonEmpty)];

    return (uniq ? uniq : "")
}

module.exports = { overview };