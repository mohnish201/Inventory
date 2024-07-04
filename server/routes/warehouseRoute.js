const express = require("express");
const {
  addWarehouse,
  removeWarehouse,
  editWarehouse,
  getAllWarehouses,
  getWarehousesById
} = require("../controllers/warehouseController");
const { authenticate } = require("../middlewares/authenticationMiddleware");
const { authorize } = require("../middlewares/authorizationMiddleware");

const warehouseRoute = express.Router();


warehouseRoute.get("/all",authenticate,authorize("Organization","Warehouses","view"), getAllWarehouses);
warehouseRoute.post("/add",authenticate,authorize("Organization","Warehouses","create"), addWarehouse);
warehouseRoute.delete("/remove/:ID",authenticate,authorize("Organization","Warehouses","delete"), removeWarehouse);
warehouseRoute.patch("/edit/:ID",authenticate,authorize("Organization","Warehouses","edit"), editWarehouse);
warehouseRoute.get("/details/:ID",authenticate,authorize("Organization","Warehouses","view"), getWarehousesById);




module.exports = {
  warehouseRoute
};
