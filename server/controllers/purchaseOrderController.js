const { Purchaseordermodel } = require("../models/purchaseOrderModel");
const mongoose = require("mongoose");
require("dotenv").config();
// Get all purchase orders
const getPurchaseOrders = async (req, res) => {

  const { page = 1, limit = 0 } = req.query;

  // Convert page to a number
  const pageNumber = parseInt(page);
  try {
    const purchaseOrders = await Purchaseordermodel.find().skip((pageNumber - 1) * parseInt(limit)).limit(parseInt(limit));
    const total = await Purchaseordermodel.countDocuments();
    if (limit != 0) {
      pageEnd = Math.ceil(total / parseInt(limit));
    } else {
      pageEnd = 1;
    }
    res.status(200).json({ message: "All the purchase order", data: purchaseOrders, pageEnd });
  } catch (error) {
    console.log("Error while getting all the purchase order", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// const getPurchaseOrderById = async (req, res) => {
//   let { ID } = req.params;
//   try {
//     const purchaseOrder = await Purchaseordermodel.findOne({ _id: ID });
//     res
//       .status(200)
//       .json({ message: "The purchase order details", data: purchaseOrder });
//   } catch (error) {
//     console.log("Error while getting the purchase order details", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const getPurchaseOrderById = async (req, res) => {
  let { ID } = req.params;
  try {
    const purchaseOrder = await Purchaseordermodel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(ID) } },
      {
        $lookup: {
          from: "vendors",
          localField: "vendorId",
          foreignField: "_id",
          as: "vendor"
        }
      },
      { $unwind: "$vendor" }, // Since $lookup returns an array, we unwind it
      {
        $lookup: {
          from: "warehouses",
          localField: "warehouseId",
          foreignField: "_id",
          as: "warehouse"
        }
      },
      { $unwind: "$warehouse" }, // Unwind warehouse array
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
              {
                $arrayToObject: {
                  $filter: {
                    input: {
                      $objectToArray: {
                        $arrayElemAt: ["$itemDetailsArray", 0],
                      },
                    },
                    cond: { $ne: ["$$this.k", "_id"] },
                  },
                },
              },
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
      }, {
        $group: {
          _id: "$_id",
          vendor: { $first: "$vendor" },
          vendorId: { $first: "$vendorId" },
          warehouseId: { $first: "$warehouseId" },
          warehouse: { $first: "$warehouse" },
          reference: { $first: "$reference" },
          purchaseOrderNo: { $first: "$purchaseOrderNo" },
          purchaseOrderDate: { $first: "$purchaseOrderDate" },
          expectedDeliveryDate: { $first: "$expectedDeliveryDate" },
          paymentTerms: { $first: "$paymentTerms" },
          deliveryMethod: { $first: "$deliveryMethod" },
          customerNote: { $first: "$customerNote" },
          termsAndCondition: { $first: "$termsAndCondition" },
          subTotal: { $first: "$subTotal" },
          total: { $first: "$total" },
          discount: { $first: "$discount" },
          itemDetails: { $push: "$itemDetails" }, // Push itemDetails back into an array
        },
      }

    ]);

    res.status(200).json({ message: "The purchase order details", data: purchaseOrder[0] });
  } catch (error) {
    console.log("Error while getting the purchase order details", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Create a new purchase order
const createPurchaseOrder = async (req, res) => {
  let payload = req.body;
  try {
    const purchaseOrder = new Purchaseordermodel(payload);
    await purchaseOrder.save();
    res.status(201).json({ message: "New Purchase Order Created" });
  } catch (error) {
    console.log("Error while creating new purchase order", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a purchase order
const editPurchaseOrder = async (req, res) => {
  let { ID } = req.params;
  let payload = req.body;

  try {
    const updatedPurchaseOrder = await Purchaseordermodel.findByIdAndUpdate(
      ID,
      payload,
      { new: true }
    );
    if (!updatedPurchaseOrder) {
      return res.status(404).json({ message: "Purchase order not found" });
    }
    res
      .status(200)
      .json({ message: "Purchase Order details updated successfully" });
  } catch (error) {
    console.log("Error while updating purchase order details", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a purchase order
const deletePurchaseOrder = async (req, res) => {
  let { ID } = req.params;
  try {
    const deletedPurchaseOrder = await Purchaseordermodel.findByIdAndDelete(ID);
    if (!deletedPurchaseOrder) {
      res.status(404).json({ message: "Purchase order not found" });
      return;
    }
    res.json({ message: "purchase order deleted successfully" });
  } catch (error) {
    console.log("Error while removing purchase order", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getPurchaseOrders,
  getPurchaseOrderById,
  createPurchaseOrder,
  editPurchaseOrder,
  deletePurchaseOrder,
};
