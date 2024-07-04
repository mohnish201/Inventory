const mongoose = require("mongoose");
require("dotenv").config();

const brandSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      message: "Brand Name is required"
    }
  },
  {
    timestamps: true,
  }
);

const Brandmodel = mongoose.model("Brands", brandSchema);

module.exports = {
  Brandmodel,
};
