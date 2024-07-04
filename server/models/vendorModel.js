const mongoose = require("mongoose");
require("dotenv").config();

const vendorSchema = mongoose.Schema(
  {
    salutation: {
      type: String,
      required: true,
      message: "Salutation is required",
    },
    firstName: {
      type: String,
      required: true,
      message: "First name is required",
    },
    lastName: {
      type: String,
      required: true,
      message: "Last name is required",
    },
    companyName: {
      type: String,
      required: true,
      message: "company name is required",
    },
    displayName: {
      type: String,
      required: true,
      message: "Display name is required",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email format",
    },
    mobileNo: {
      type: Number,
      required: true,
      message: "Mobile No is required",
    },
    PAN: { type: String, required: true, message: "PAN No is required" },
    GSTNo:{type:String,required:true,message:"GST No is required"},
    currency: { type: mongoose.Schema.Types.ObjectId, required: true, message: "Currency is required" },
    paymentTerms: { type: String, required: true, message: "Payment Term is required" },
    TDS: { type: String, required: true, message: "TDS is required" },
    billingAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      phone: { type: String },
      country: { type: String },
    },
    shippingAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      phone: { type: String },
      country: { type: String },
    },
    contactPerson: [
      {
        salutation: {
          type: String,
          required: true,
          message: "Salutation is required",
        },
        firstName: {
          type: String,
          required: true,
          message: "First name is required",
        },
        lastName: {
          type: String,
          required: true,
          message: "Last name is required",
        },
        email: {
          type: String,
          required: true,
          match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email format",
        },
        mobileNo: {
          type: Number,
          required: true,
          message: "Mobile No is required",
        },
      },
    ],
    bankDetails: [
      {
        beneficiaryName: { type: String },
        bankName: { type: String },
        accountNumber: { type: String },
        IFSC: { type: String }
      }
    ],
    remark: { type: String }
  },
  {
    timestamps: true,
  }
);

const Vendorsmodel = mongoose.model("Vendors", vendorSchema);

module.exports = {
  Vendorsmodel,
};
