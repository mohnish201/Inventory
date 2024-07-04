const express = require("express");
const {
  getAllDetails,
  getLatestItems,
  getMonthwiseSalesAndPurchaseOrder
} = require("../controllers/dashboardDetailsController");
const { authenticate } = require("../middlewares/authenticationMiddleware");
const { authorize } = require("../middlewares/authorizationMiddleware");

const dashboardRoute = express.Router();

dashboardRoute.get("/all", getAllDetails);
dashboardRoute.get("/latest-items",getLatestItems);
dashboardRoute.get("/monthwise-sales-purchase-order",getMonthwiseSalesAndPurchaseOrder)



module.exports = {
  dashboardRoute
};
