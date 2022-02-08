const regex = new RegExp('^' + 'benefit', 'i');
let benefitArray = []
//complete deletes first element is it has less than 5 words
const benefit = async (semiInfo) => {
    semiInfo.uses.forEach((element, index) => {
        if (element.list.indexOf("Show More") > -1) {
            element.list.pop()
        }

        if (element.heading.match(regex)) {
            benefitArray.push(element)

        }

    });

    const newArr = semiInfo.uses.filter(function (el) {
        return benefitArray.indexOf(el) < 0;
    });
    semiInfo.uses = newArr
    semiInfo.benefits = benefitArray
    return (semiInfo ? semiInfo : "")
}

module.exports = { benefit };