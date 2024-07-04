const { Salesordermodel } = require("../models/salesOrderModel");
const { Itemsmodel } = require("../models/itemsModel");
const mongoose = require("mongoose");
require("dotenv").config();
// Get all sales orders
const getSalesOrders = async (req, res) => {
  const { page = 1, limit = 0 } = req.query;
  try {
    // Convert page to a number
    const pageNumber = parseInt(page);
    const salesOrders = await Salesordermodel.find().skip((pageNumber - 1) * parseInt(limit)).limit(parseInt(limit));
    const total = await Salesordermodel.countDocuments();
    if (limit != 0) {
      pageEnd = Math.ceil(total / parseInt(limit));
    } else {
      pageEnd = 1;
    }
    res.status(200).json({ message: "All the sales order", data: salesOrders, pageEnd });
  } catch (error) {
    console.log("Error while getting all the sales order", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// const getSalesOrderById = async (req, res) => {
//   let { ID } = req.params;
//   console.log("hh",process.env.PUBLIC_AWS_BASE_URL)
//   try {
//     const salesOrder = await Salesordermodel.aggregate([
//       {
//         $match: { _id: new mongoose.Types.ObjectId(ID) }
//       },
//       {
//         $lookup: {
//           from: "customers",
//           localField: "customerId",
//           foreignField: "_id",
//           as: "customerArray"
//         }
//       },
//       {
//         $addFields: {
//           customer: { $arrayElemAt: ["$customerArray", 0] }
//         }
//       },
//       {
//         $unwind: "$itemDetails" // Unwind the itemDetails array
//       },
//       {
//         $lookup: {
//           from: "items",
//           localField: "itemDetails.itemId",
//           foreignField: "_id",
//           as: "itemDetailsArray"
//         }
//       },
//       {
//         $addFields: {
//           "itemDetails": {
//             $mergeObjects: [
//               "$itemDetails",
//               { $arrayElemAt: ["$itemDetailsArray", 0] }
//             ]
//           }
//         }
//       },
//       {
//         $addFields: {
//           "itemDetails.itemsImage": {
//             $map: {
//               input: "$itemDetails.itemsImage",
//               as: "image",
//               in: {
//                 $concat: [process.env.PUBLIC_AWS_BASE_URL, "$$image"]
//               }
//             }
//           }
//         }
//       },
//       {
//         $group: {
//           _id: "$_id",
//           customerId: { $first: "$customerId" },
//           reference: { $first: "$reference" },
//           salesOrderNo: { $first: "$salesOrderNo" },
//           salesOrderDate: { $first: "$salesOrderDate" },
//           expectedShipmentDate: { $first: "$expectedShipmentDate" },
//           paymentTerms: { $first: "$paymentTerms" },
//           deliveryMethod: { $first: "$deliveryMethod" },
//           salesPerson: { $first: "$salesPerson" },
//           customerNote: { $first: "$customerNote" },
//           termsAndCondition: { $first: "$termsAndCondition" },
//           shippingCharges: { $first: "$shippingCharges" },
//           otherCharges: { $first: "$otherCharges" },
//           subTotal: { $first: "$subTotal" },
//           total: { $first: "$total" },
//           customer: { $first: "$customer" },
//           itemDetails: { $push: "$itemDetails" } // Push itemDetails back into an array
//         }
//       }
//     ]);

//     if (!salesOrder || salesOrder.length === 0) {
//       return res.status(404).json({ message: 'Sales order not found' });
//     }

//     res.status(200).json({ message: 'Sales order details', data: salesOrder[0] });
//   } catch (error) {
//     console.log('Error while getting the sales order details', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

const getSalesOrderById = async (req, res) => {
  const { ID } = req.params;
  try {
    const salesOrder = await Salesordermodel.aggregate([
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
      },
      {
        $group: {
          _id: "$_id",
          customerId: { $first: "$customerId" },
          reference: { $first: "$reference" },
          salesOrderNo: { $first: "$salesOrderNo" },
          salesOrderDate: { $first: "$salesOrderDate" },
          expectedShipmentDate: { $first: "$expectedShipmentDate" },
          paymentTerms: { $first: "$paymentTerms" },
          deliveryMethod: { $first: "$deliveryMethod" },
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

    if (!salesOrder || salesOrder.length === 0) {
      return res.status(404).json({ message: "Sales order not found" });
    }

    res
      .status(200)
      .json({ message: "Sales order details", data: salesOrder[0] });
  } catch (error) {
    console.log("Error while getting the sales order details", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Create a new sales order
const createSalesOrder = async (req, res) => {
  let payload = req.body;
  try {
    let checkSalesOrderExist = await Salesordermodel.findOne({
      salesOrderNo: req.body.salesOrderNo,
    });
    if (checkSalesOrderExist) {
      return res
        .status(400)
        .json({ message: "This Sales Order Already Exist" });
    }

    let insufficientStockItems = [];
    // Loop through each item in the sales order
    for (const itemDetail of payload.itemDetails) {
      const item = await Itemsmodel.findById(itemDetail.itemId);
      if (!item) {
        return res.status(400).json({ message: "Item not found" });
      }

      // Check if requested quantity is greater than current stock
      if (item.currentStock < itemDetail.quantity) {
        insufficientStockItems.push({
          itemId: item._id,
          itemName: item.name,
          requestedQuantity: itemDetail.quantity,
          currentStock: item.currentStock,
        });
      }
    }

    if (insufficientStockItems.length > 0) {
      return res.status(400).json({
        message: "Insufficient stock for some items in the order",
        insufficientStockItems: insufficientStockItems,
      });
    } else {
      // Loop through each item in the sales order
      for (const itemDetail of payload.itemDetails) {
        const item = await Itemsmodel.findById(itemDetail.itemId);
        if (!item) {
          return res.status(400).json({ message: "Item not found" });
        }

        // Deduct the sold quantity from the current stock
        item.currentStock -= itemDetail.quantity;
        await item.save();
      }
    }

    const salesOrder = new Salesordermodel(payload);
    await salesOrder.save();
    res.status(201).json({ message: "New Sales Order Created" });
  } catch (error) {
    console.log("Error while creating new sales order", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a sales order
const editSalesOrder = async (req, res) => {
  let { ID } = req.params;
  let payload = req.body;

  try {
    const updatedSalesOrder = await Salesordermodel.findByIdAndUpdate(
      ID,
      payload,
      { new: true }
    );
    if (!updatedSalesOrder) {
      return res.status(404).json({ message: "Sales order not found" });
    }
    res
      .status(200)
      .json({ message: "Sales Order details updated successfully" });
  } catch (error) {
    console.log("Error while updating sales order details", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a sales order
const deleteSalesOrder = async (req, res) => {
  let { ID } = req.params;
  try {
    const deletedSalesOrder = await Salesordermodel.findByIdAndDelete(ID);
    if (!deletedSalesOrder) {
      res.status(404).json({ message: "Sales order not found" });
      return;
    }
    res.json({ message: "Sales order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSalesOrders,
  createSalesOrder,
  deleteSalesOrder,
  editSalesOrder,
  getSalesOrderById,
};
