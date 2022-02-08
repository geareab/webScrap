const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
    is_discontinued: {
        type: Boolean,
        required: true,
    },
    manufacturer_name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    sku_id: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
    pack_size_label: {
        type: String,
        required: true,
    },
    rx_required: {
        type: Object,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    short_composition: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    in_stock: {
        type: Object,
        required: false,
    },
    quantity: {
        type: Number,
        required: true,
    },
    data: {
        type: Object,
        required: false,
    },
    hasData: {
        type: Boolean,
        required: true,
    },
});


module.exports = mongoose.model("Medicine", medicineSchema);
