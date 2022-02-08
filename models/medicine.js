const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
    is_discontinued: {
        type: Boolean,
        required: false,
    },
    manufacturer_name: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: false,
    },
    sku_id: {
        type: Number,
        required: false,
    },
    available: {
        type: Boolean,
        required: false,
    },
    pack_size_label: {
        type: String,
        required: false,
    },
    rx_required: {
        type: Object,
        required: false,
    },
    slug: {
        type: String,
        required: false,
    },
    short_composition: {
        type: String,
        required: false,
    },
    image_url: {
        type: String,
        required: false,
    },
    in_stock: {
        type: Object,
        required: false,
    },
    quantity: {
        type: Number,
        required: false,
    },
});


module.exports = mongoose.model("Medicine", medicineSchema);
