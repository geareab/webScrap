//comeplte: save only the element after storage

const storage = async (semiInfo) => {
    const regex = new RegExp('^' + 'storage', 'i');
    const semiInfoNonEmpty = semiInfo.filter(function (e) { return e });
    let storageIndex = 0;
    await semiInfoNonEmpty.some(
        (e, index) => {
            if (e.match(regex)) {
                storageIndex = index
                return true
            }
        })
    if (!storageIndex) {
        semiInfoNonEmpty[1] = '';
    }
    storageIndex++;

    return (semiInfoNonEmpty[storageIndex] ? semiInfoNonEmpty[storageIndex] : "")
}

module.exports = { storage };