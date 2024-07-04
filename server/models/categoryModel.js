const mongoose = require("mongoose");
require("dotenv").config();

const categorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      message: "Category Name is required"
    }
  },
  {
    timestamps: true,
  }
);

const Categorymodel = mongoose.model("Categories", categorySchema);

module.exports = {
  Categorymodel,
};
