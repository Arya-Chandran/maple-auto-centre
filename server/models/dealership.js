const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dealershipSchema = new Schema(
    {
        dealerId: {
            type: String,
            required: true
        },
        dealerName: {
            type: String,
            required: true
        },
        dealerAddress:  {
            type: String,
            required: true
        },
        dealerPhoneNumber:  {
            type: String,
            required: true
        },
        emailId:  {
            type: String,
            required: true
        }

    });
  
    const Dealership = mongoose.model("dealerships", dealershipSchema);
    module.exports = Dealership;