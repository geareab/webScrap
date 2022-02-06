const axios = require('axios');

const fetchingAlphabet = async (char) => {
    const response = await axios.get(`https://www.1mg.com/pharmacy_api_gateway/v4/drug_skus/by_prefix?prefix_term=${char}`)
    const data = await response;
    //console.log(data.data.meta.total_count)

    let totalCount = data.data.meta.total_count;

    let pages = Math.ceil(parseInt(totalCount) / 50)
    return pages


    //axios.get(`https://www.1mg.com/pharmacy_api_gateway/v4/drug_skus/by_prefix?prefix_term=${char}`).then()
}


module.exports = { fetchingAlphabet };
