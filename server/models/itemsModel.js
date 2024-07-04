const mongoose = require("mongoose");
require("dotenv").config();

const itemsSchema = mongoose.Schema(
  {
    types: {
      type: String,
      required: true,
      enum: ["goods", "service"],
      message: "Invalid Item Type",
    },
    name: {
      type: String,
      required: true,
      message: "Name is required",
    },
    itemsImage: [
      {
        type: String,
        required: false,
        message: "Item Image is required",
      }
    ]
    ,
    SKU: {
      type: String,
      required: false,
      message: "SKU(Stock Keeping Units) is required",
    },
    unit: {
      type: String,
      required: false,
      message: "Unit(i.e: item will be measured in terms) is required",
    },
    dimensions: {
      length: {
        type: String,
        required: false,
        message: "Length is required",
      },
      width: {
        type: String,
        required: false,
        message: "Width is required",
      },
      height: {
        type: String,
        required: false,
        message: "Height is required",
      },
      unit: {
        type: String,
        required: false,
        message: "dimension unit is required",
      }
    },
    weight: {
      type: Number,
      required: false,
      message: "Weight is required",
    },
    manufacturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Manufacturers",
      required: false,
      message: "Manufacturer is required",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Brands",
      required: false,
      message: "Brand Name is required",
    },
    UPC: {
      type: String,
      required: false,
      message: "UPC(Universal Product Code) is required",
    },
    EAN: {
      type: String,
      required: false,
      message: "EAN(International Article Number) is required",
    },
    MPN: {
      type: String,
      required: false,
      message: "MPN(Manufacturing Part Number) is required",
    },
    ISBN: {
      type: String,
      required: false,
      message: "ISBN(International Standard Book Number) is required",
    },
    category:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Categories",
      required: false,
      message: "Category is required",
    },
    warehouse:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Warehouse",
      required: false,
      message: "Warehouse ID is required",
    },
    salesInformation: {
      sellingPrice: { type: Number },
      account: { type: String },
      description: { type: String },
    },
    purchaseInformation: {
      costPrice: { type: Number },
      account: { type: String },
      description: { type: String },
      preferredVendor: { 
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vendors"
       },
    },
    trackInventory: {
      type: Boolean,
      required: false,
      message: "Track Inventory for this items is required",
    },
    openingStock: {
      type: Number,
      required: false,
      default:0,
      message: "Opening Stock is required",
    },
    currentStock:{
      type: Number,
      required: false,
      default:0,
      message: "Opening Stock is required",
    },
    reorderPoint: {
      type: Number,
      required: false,
      default:0,
      message: "Reorder Point is required",
    },
    openingStockRatePerUnit: {
      type: Number,
      required: false,
      default:0,
      message: "Opening Stock Rate Per Unit is required",
    }
  },
  {
    timestamps: true,
  }
);

const Itemsmodel = mongoose.model("Items", itemsSchema);

module.exports = {
  Itemsmodel,
};
