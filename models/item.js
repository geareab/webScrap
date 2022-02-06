const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  sku: {
    type: Array,
    required: true,
  },
  char: {
    type: String,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
