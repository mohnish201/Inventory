const mongoose = require("mongoose");
require("dotenv").config();

const purchaseOrderSchema = mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Vendors",
      message: "Vendors ID is required",
    },
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Warehouses",
      message: "Warehouses ID is required",
    },
    reference: {
      type: String,
      required: false,
      message: "Reference is required",
    },
    purchaseOrderNo: {
      type: String,
      required: true,
      unique: true,
      message: "Purchase Order Number is required",
    },
    purchaseOrderDate: {
      type: String,
      required: true,
      message: "Sales Order Date is required",
    },
    expectedDeliveryDate: {
      type: String,
      required: true,
      message: "Expected Delivery Date is required",
    },
    paymentTerms: {
      type: String,
      required: false,
      message: "Payment Terms is required",
    },
    deliveryMethod: {
      type: String,
      required: true,
      message: "Delivery Method is required",
    },
    itemDetails: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Items",
          message: "Item Id is required",
        },
        account: {
          type: String,
          required: true,
          message: "Account Type is required",
        },
        quantity: {
          type: Number,
          required: true,
          message: "Item Quantity is required",
        },
        rate: {
          type: Number,
          required: true,
          message: "rate is required",
        },
        amount: {
          type: Number,
          required: true,
          message: "amount is required",
        },
      },
    ],
    customerNote: {
      type: String,
      required: false,
      message: "Customer Note is required",
    },
    termsAndCondition: {
      type: String,
      required: true,
      message: "Terms and Condition is required",
    },
    subTotal: {
      type: Number,
      required: true,
      message: "Sub Total is required",
    },
    discount: {
      type: Number,
      required: false,
      message: "Discount percent is required",
    },
    total: {
      type: Number,
      required: true,
      message: "Total amount is required",
    },
  },
  {
    timestamps: true,
  }
);

const Purchaseordermodel = mongoose.model(
  "purchaseorders",
  purchaseOrderSchema
);

module.exports = {
  Purchaseordermodel,
};
