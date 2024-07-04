const express = require("express");
const {
  addManufacturer,
  removeManufacturer,
  getAllManufacturer,
  editManufacturer,
  getManufacturerDetailsById
} = require("../controllers/manufacturerController");
const { authenticate } = require("../middlewares/authenticationMiddleware");
const { authorize } = require("../middlewares/authorizationMiddleware");

const manufacturerRoute = express.Router();

manufacturerRoute.post("/add",authenticate,authorize("Manufacturer","Manufacturer","create"), addManufacturer);
manufacturerRoute.delete("/remove/:ID",authenticate,authorize("Manufacturer","Manufacturer","delete"), removeManufacturer);
manufacturerRoute.get("/all",authenticate,authorize("Manufacturer","Manufacturer","view"), getAllManufacturer);
manufacturerRoute.patch('/edit/:ID',authenticate,authorize("Manufacturer","Manufacturer","edit"),editManufacturer);
manufacturerRoute.get("/details/:ID",authenticate,authorize("Manufacturer","Manufacturer","view"),getManufacturerDetailsById)


module.exports = {
  manufacturerRoute
};
