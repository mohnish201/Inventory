const express = require("express");
const {
  getSalesOrders,
  getSalesOrderById,
  createSalesOrder,
  editSalesOrder,
  deleteSalesOrder,
} = require("../controllers/salesOrderController");
const { authenticate } = require("../middlewares/authenticationMiddleware");
const { authorize } = require("../middlewares/authorizationMiddleware");
const { pdfConverterController } = require("../controllers/pdfController");

const salesOrderRoute = express.Router();

salesOrderRoute.post(
  "/add",
  authenticate,
  authorize("Sales", "Sales Orders", "create"),
  createSalesOrder
);
salesOrderRoute.get(
  "/all",
  
  getSalesOrders
);
salesOrderRoute.get(
  "/details/:ID",

  getSalesOrderById
);
salesOrderRoute.patch(
  "/edit/:ID",
  authenticate,
  authorize("Sales", "Sales Orders", "edit"),
  editSalesOrder
);
salesOrderRoute.delete(
  "/remove/:ID",
  authenticate,
  authorize("Sales", "Sales Orders", "delete"),
  deleteSalesOrder
);

salesOrderRoute.post(
  "/generatePdf",
  authenticate,
  authorize("Sales", "Sales Orders", "create"),
  pdfConverterController
);

module.exports = {
  salesOrderRoute,
};
