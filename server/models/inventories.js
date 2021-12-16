const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema(
  {
    year: {
        type: Number,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    trim:  {
        type: String,
        required: true
    },
    vin:  {
        type: String,
        required: true
    },
    dealerName:  {
        type: String,
        required: true
    },
    dealerId:  {
        type: String,
        required: true
    },
    price:  {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    features:  {
        type: Array,
        required: true
    },
    details:  {
        type: Object,
        required: true
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("inventories", inventorySchema);
module.exports = Inventory;
