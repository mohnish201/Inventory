const mongoose = require("mongoose");
require("dotenv").config();

const paymentSchema = mongoose.Schema(
    {
        invoiceId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Invoice",
            message: "Invoice ID is required"
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Customers",
            message: "Customer ID is required"
        },
        bankCharges: {
            type: Number,
            required: false,
            message:"Bank Charges is required"
        },
        status:{
            type:String,
            enum:["pending", "paid"],
            default: "pending",
            message:"Status is required"
        },
        paymentMode: {
            type: String,
            required: false,
            message:"Payment Mode is required"
        },
        reference: {
            type: String,
            required: false,
            message:"Reference is required"
        },
        taxDeduction:{
            type:Boolean,
            required: false,
            message:"Tax Deduction is required"
        },
        totalAmount: {
            type: Number,
            required: true,
            message:" Total Amount is required"
        },
        amountReceived:{
            type: Number,
            required: true,
            message:"Amount Received is required"
        },
        amountDue: {
            type: Number,
            required: true,
            message:"Amount Due is required"
        },
        paymentDate: {
            type: Date,
            required: true,
            message:"Payment date is required"
        },
        notes:{
            type:String,
            required:false,
            message:"Notes is required"
        }
        
    },
    {
        timestamps: true,
    }
);

const Paymentmodel = mongoose.model("Payments", paymentSchema);

module.exports = {
    Paymentmodel,
};
