const express = require("express");
const {
  addBrand,
  removeBrand,
  getAllBrands,
  editBrandDetails
} = require("../controllers/brandController");
const { authenticate } = require("../middlewares/authenticationMiddleware");
const { authorize } = require("../middlewares/authorizationMiddleware");

const brandRoute = express.Router();

brandRoute.get("/all",authenticate,authorize("Brand","Brand","view"), getAllBrands);
brandRoute.post("/add",authenticate,authorize("Brand","Brand","create"), addBrand);
brandRoute.patch("/edit/:ID", authenticate,authorize("Brand","Brand","edit"),editBrandDetails);
brandRoute.delete("/remove/:ID",authenticate,authorize("Brand","Brand","delete"), removeBrand);



module.exports = {
  brandRoute
};
