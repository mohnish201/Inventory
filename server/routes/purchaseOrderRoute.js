const express = require("express");
const {} = require("../controllers/salesOrderController");
const { authenticate } = require("../middlewares/authenticationMiddleware");
const { authorize } = require("../middlewares/authorizationMiddleware");
const {
  createPurchaseOrder,
  getPurchaseOrders,
  getPurchaseOrderById,
  editPurchaseOrder,
  deletePurchaseOrder,
} = require("../controllers/purchaseOrderController");

const purchaseOrderRoute = express.Router();

purchaseOrderRoute.post(
  "/add",
  authenticate,
  authorize("Purchases", "Purchase Orders", "create"),
  createPurchaseOrder
);
purchaseOrderRoute.get(
  "/all",
  authenticate,
  authorize("Purchases", "Purchase Orders", "view"),
  getPurchaseOrders
);
purchaseOrderRoute.get(
  "/details/:ID",
  
  getPurchaseOrderById
);
purchaseOrderRoute.patch(
  "/edit/:ID",
  authenticate,
  authorize("Purchases", "Purchase Orders", "edit"),
  editPurchaseOrder
);
purchaseOrderRoute.delete(
  "/remove/:ID",
  authenticate,
  authorize("Purchases", "Purchase Orders", "delete"),
  deletePurchaseOrder
);

module.exports = {
  purchaseOrderRoute,
};
