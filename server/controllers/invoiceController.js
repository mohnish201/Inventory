const { Invoicemodel } = require("../models/invoiceModel");
const mongoose = require("mongoose");
require("dotenv").config();

// Get all sales orders
const getInvoice = async (req, res) => {
  const { page = 1, limit = 0 } = req.query;

  // Convert page to a number
  const pageNumber = parseInt(page);
  try {
    const invoices = await Invoicemodel.find().skip((pageNumber - 1) * parseInt(limit)).limit(parseInt(limit));
    const total = await Invoicemodel.countDocuments();
    if (limit != 0) {
      pageEnd = Math.ceil(total / parseInt(limit));
    } else {
      pageEnd = 1;
    }
    res.status(200).json({ message: "All the invoices", data: invoices, pageEnd });
  } catch (error) {
    console.log("Error while getting all the invoices", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getInvoicesById = async (req, res) => {
  let { ID } = req.params;
  try {
    const invoice = await Invoicemodel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(ID) },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customerArray",
        },
      },
      {
        $addFields: {
          customer: { $arrayElemAt: ["$customerArray", 0] },
        },
      },
      {
        $unwind: "$itemDetails", // Unwind the itemDetails array
      },
      {
        $lookup: {
          from: "items",
          localField: "itemDetails.itemId",
          foreignField: "_id",
          as: "itemDetailsArray",
        },
      },
      {
        $addFields: {
          itemDetails: {
            $mergeObjects: [
              "$itemDetails",
              { $arrayElemAt: ["$itemDetailsArray", 0] },
            ],
          },
        },
      },
      {
        $addFields: {
          "itemDetails.itemsImage": {
            $map: {
              input: "$itemDetails.itemsImage",
              as: "image",
              in: {
                $concat: [process.env.PUBLIC_AWS_BASE_URL, "$$image"],
              },
            },
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          customerId: { $first: "$customerId" },
          reference: { $first: "$reference" },
          invoiceNo: { $first: "$invoiceNo" },
          invoiceDate: { $first: "$invoiceDate" },
          paymentTerms: { $first: "$paymentTerms" },
          salesPerson: { $first: "$salesPerson" },
          customerNote: { $first: "$customerNote" },
          termsAndCondition: { $first: "$termsAndCondition" },
          shippingCharges: { $first: "$shippingCharges" },
          otherCharges: { $first: "$otherCharges" },
          subTotal: { $first: "$subTotal" },
          total: { $first: "$total" },
          customer: { $first: "$customer" },
          itemDetails: { $push: "$itemDetails" }, // Push itemDetails back into an array
        },
      },
    ]);

    if (!invoice || invoice.length === 0) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({ message: "Invoice details", data: invoice[0] });
  } catch (error) {
    console.log("Error while getting the invoice details", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new Invoice
const createInvoice = async (req, res) => {
  let payload = req.body;
  try {
    let checkInvoiceExist = await Invoicemodel.findOne({
      invoiceNo: payload.invoiceNo,
    });

    if (checkInvoiceExist) {
      return res.status(400).json({ message: "This Invoice Already Exist" });
    }

    const newInvoice = new Invoicemodel(payload);
    await newInvoice.save();

    res.status(201).send({ message: "New Invoice Created" });
  } catch (error) {
    console.log("Error while creating new invoice", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a sales order
const editInvoiceDetails = async (req, res) => {
  let { ID } = req.params;
  let payload = req.body;

  try {
    const updatedInvoice = await Invoicemodel.findByIdAndUpdate(ID, payload, {
      new: true,
    });
    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json({ message: "Invoice details updated successfully" });
  } catch (error) {
    console.log("Error while updating invoice details", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a sales order
const deleteInvoice = async (req, res) => {
  let { ID } = req.params;
  try {
    const deletedInvoice = await Invoicemodel.findByIdAndDelete(ID);
    if (!deletedInvoice) {
      res.status(404).json({ message: "Invoice not found" });
      return;
    }
    res.json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInvoice,
  createInvoice,
  deleteInvoice,
  editInvoiceDetails,
  getInvoicesById,
};
