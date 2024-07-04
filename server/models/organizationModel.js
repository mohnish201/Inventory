const mongoose = require("mongoose");
require("dotenv").config();

const organizationSchema = mongoose.Schema(
  {
    organizationLogo: {
      type: String,
      required: false,
      message: "Organization Logo is required",
    },
    organizationName: {
      type: String,
      required: true,
      message: "Organization Name is required",
    },
    industry: {
      type: String,
      required: true,
      message: "Industry is required",
    },
    location: {
      type: String,
      required: true,
      message: "Organization Location is required",
    },
    address: {
      street: {
        type: String,
        required: true,
        message: "Street is required",
      },
      city: {
        type: String,
        required: true,
        message: "City is required",
      },
      state: {
        type: String,
        required: true,
        message: "State is required",
      },
      country: {
        type: String,
        required: true,
        message: "Country is required",
      },
      pincode: {
        type: String,
        required: true,
        message: "Pincode is required",
      },
    },
    websiteUrl: {
      type: String,
      required: false,
      message: "Website URL is required",
    },
    primaryContact: {
      type: String,
      required: true,
      message: "Primary Contact is required",
    },
    baseCurrency: {
      type: String,
      required: true,
      message: "Base Currency is required",
    },
  },
  {
    timestamps: true,
  }
);

const Organizationmodel = mongoose.model("Organizations", organizationSchema);

module.exports = {
  Organizationmodel,
};
