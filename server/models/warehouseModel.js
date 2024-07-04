const mongoose = require("mongoose");
require("dotenv").config();

const warehouseSchema = mongoose.Schema(
    {
        warehouseName: {
            type: String,
            required: true,
            message: "Warehouse Name is required"
        },
        address: {
            street: {
                type: String,
                required: true,
                message: "Street Name is required"
            },
            city: {
                type: String,
                required: true,
                message: "City Name is required"
            },
            state: {
                type: String,
                required: true,
                message: "State Name is required"
            },
            zipCode: {
                type: String,
                required: true,
                message: "Zipcode is required"
            },
            country: {
                type: String,
                required: true,
                message: "Country Name is required"
            },
        },
        isPrimary: {
            type: Boolean,
            default: false,
            required: true,
            message: "Warehouse is primary or not required"
        },
        status: {
            type: String,
            required: true,
            enum: ["active", "inactive"],
            default: "active",
            message: "Status of warehouse is required"
        },
        phone: {
            type: Number,
            required: true,
            message: "Phone Number is required"
        },
    },
    {
        timestamps: true,
    }
);

const Warehousemodel = mongoose.model("Warehouses", warehouseSchema);

module.exports = {
    Warehousemodel,
};
