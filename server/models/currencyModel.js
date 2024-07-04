const mongoose = require("mongoose");
require("dotenv").config();

const currencySchema = mongoose.Schema(
    {
        currencyCode: {
            type: String,
            required: true,
            message: "Country Code is required"
        },
        currencySymbol: {
            type: String,
            required: true,
            message: "Currency Symbol is required"
        },
        currencyName: {
            type: String,
            required: true,
            message: "Currency Name is required"
        },
        decimalPlace: {
            type: String,
            required: true,
            message: "Decimal Place is required"
        }
    },
    {
        timestamps: true,
    }
);

const Currencymodel = mongoose.model("Countrycodes", currencySchema);

module.exports = {
    Currencymodel,
};
