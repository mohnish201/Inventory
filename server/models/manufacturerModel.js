const mongoose = require("mongoose");
require("dotenv").config();

const manufacturerSchema = mongoose.Schema(
  {
    manufacturerName: {
      type: String,
      required: true,
      message: "Manufacturer Name is required"
    }
  },
  {
    timestamps: true,
  }
);

const Manufacturermodel = mongoose.model("Manufacturers", manufacturerSchema);

module.exports = {
  Manufacturermodel,
};
