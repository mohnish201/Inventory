const mongoose = require("mongoose");
require("dotenv").config();

const salesOrderSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customers",
      message: "Customer ID is required",
    },
    reference: {
      type: String,
      required: false,
      message: "Reference is required",
    },
    salesOrderNo: {
      type: String,
      required: true,
      unique: true,
      message: "Sales Order Number is required",
    },
    salesOrderDate: {
      type: String,
      required: true,
      message: "Sales Order Date is required",
    },
    expectedShipmentDate: {
      type: String,
      required: false,
      message: "Expected Shipment Date is required",
    },
    paymentTerms: {
      type: String,
      required: false,
      message: "Payment Terms is required",
    },
    deliveryMethod: {
      type: String,
      required: false,
      message: "Delivery Method is required",
    },
    salesPerson: {
      type: String,
      required: false,
      message: "Sales Person is required",
    },
    itemDetails: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Items",
          message: "Item Id is required",
        },
        quantity: {
          type: Number,
          required: true,
          message: "Item Quantity is required",
        },
        discountPercent: {
          type: Number,
          required: true,
          message: "Discount percent is required",
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
      required: false,
      message: "Terms and Condition is required",
    },
    shippingCharges: {
      type: Number,
      required: false,
      message: "Shipping charges is required",
    },
    otherCharges: {
      type: Number,
      required: false,
      message: "Other Charges is required",
    },
    subTotal: {
      type: Number,
      required: true,
      message: "Sub Total is required",
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

const Salesordermodel = mongoose.model("Salesorders", salesOrderSchema);

module.exports = {
  Salesordermodel,
};
