const mongoose = require("mongoose");
require("dotenv").config();

const blacklistSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      message: "Blacklist token is required"
    }
  },
  {
    timestamps: true,
  }
);

const Blacklistmodel = mongoose.model("Blacklisttoken", blacklistSchema);

module.exports = {
  Blacklistmodel,
};
