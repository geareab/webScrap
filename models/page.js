const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    char: {
        type: String,
        required: true
    },
    page: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model("Page", pageSchema);
