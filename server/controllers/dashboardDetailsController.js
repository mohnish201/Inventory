const { Itemsmodel } = require("../models/itemsModel");
const { Salesordermodel } = require("../models/salesOrderModel");
const { Purchaseordermodel } = require("../models/purchaseOrderModel");
const { Invoicemodel } = require("../models/invoiceModel");
const { Customermodel } = require('../models/customerModel');
const { Vendorsmodel } = require("../models/vendorModel");
require("dotenv").config();

const getAllDetails = async (req, res) => {
    try {
        const totalItems = await Itemsmodel.countDocuments();
        const totalSalesOrders = await Salesordermodel.countDocuments();
        const totalPurchaseOrders = await Purchaseordermodel.countDocuments();
        const totalInvoices = await Invoicemodel.countDocuments();
        const totalCustomers = await Customermodel.countDocuments();
        const totalVendors = await Vendorsmodel.countDocuments();

        const salesOrders = await Salesordermodel.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$total" }
                }
            }
        ]);

        const totalSalesOrdersAmount = salesOrders.length > 0 ? salesOrders[0].totalSales : 0;

        const purchaseOrders = await Purchaseordermodel.aggregate([
            {
                $group: {
                    _id: null,
                    totalPurchases: { $sum: "$total" }
                }
            }
        ]);

        const totalPurchaseOrdersAmount = purchaseOrders.length > 0 ? purchaseOrders[0].totalPurchases : 0;

        const invoices = await Invoicemodel.aggregate([
            {
                $group: {
                    _id: null,
                    totalInvoices: { $sum: "$total" }
                }
            }
        ]);

        const totalInvoicesAmount = invoices.length > 0 ? invoices[0].totalInvoices : 0;

        // Count of items with current stock equal to or less than reorder point
        //  const itemsBelowReorderPoint = await Itemsmodel.aggregate([
        //     {
        //       $match: {
        //         currentStock: { $lte: $reorderPoint }
        //       }
        //     },
        //     {
        //       $count: "itemsBelowReorderPoint"
        //     }
        //   ]);
        // const itemsBelowReorderPointCount = itemsBelowReorderPoint.length > 0 ? itemsBelowReorderPoint[0].itemsBelowReorderPoint : 0;
        // console.log(itemsBelowReorderPoint,itemsBelowReorderPointCount);


        res.status(200).json({
            message: "All the detials of the dashboard",
            totalItems,
            totalSalesOrders,
            totalPurchaseOrders,
            totalInvoices,
            totalCustomers,
            totalSalesOrdersAmount,
            totalPurchaseOrdersAmount,
            totalInvoicesAmount,
            // itemsBelowReorderPoint,
            totalVendors
        });
    } catch (error) {
        console.error("Error while getting all the details for dashboard:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getMonthwiseSalesAndPurchaseOrder = async (req, res) => {
    try {
        const year = parseInt(req.query.year);

        const pipeline = [
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${year}-01-01`),
                        $lt: new Date(`${year + 1}-01-01`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id": 1 }
            }
        ]

        const salesOrdersByMonth = await Salesordermodel.aggregate(pipeline);

        const purchaseOrdersByMonth = await Purchaseordermodel.aggregate(pipeline)

        // console.log(salesOrdersByMonth,purchaseOrdersByMonth)

        const salesOrdersCountArray = Array(12).fill(0);
        salesOrdersByMonth.forEach(item => {
            salesOrdersCountArray[item._id - 1] = item.count;
        });

        const purchaseOrdersCountArray = Array(12).fill(0);
        purchaseOrdersByMonth.forEach(item => {
            purchaseOrdersCountArray[item._id - 1] = -item.count;
        });

        res.status(200).json({
            message: "Sales and Purchase order monthwise",
            salesOrdersByMonth: salesOrdersCountArray,
            purchaseOrdersByMonth: purchaseOrdersCountArray
        });
    } catch (error) {
        console.error("Error while getting all the details for dashboard:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



const getLatestItems = async (req, res) => {
    try {
        const pipeline = [
            {
                $addFields: {
                    "itemsImage": {
                        $map: {
                            input: "$itemsImage",
                            as: "image",
                            in: { $concat: [process.env.PUBLIC_AWS_BASE_URL, "$$image"] }
                        }
                    }
                }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $limit: 5
            }
        ];

        const latestItems = await Itemsmodel.aggregate(pipeline);
        res.json(latestItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}





module.exports = {
    getAllDetails,
    getLatestItems,
    getMonthwiseSalesAndPurchaseOrder
};
