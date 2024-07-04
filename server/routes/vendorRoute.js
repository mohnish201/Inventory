const express = require("express");
const {
    addNewVendor,
    removeVendor,
    getAllVendors,
    editVendorDetails,
    getVendorDetails
} = require("../controllers/vendorController");
const { authenticate } = require("../middlewares/authenticationMiddleware");
const { authorize } = require("../middlewares/authorizationMiddleware");

const vendorRoute = express.Router();

vendorRoute.post("/add",authenticate,authorize("Purchases","Vendors","create"), addNewVendor);
vendorRoute.delete("/remove/:ID",authenticate,authorize("Purchases","Vendors","delete"), removeVendor);
vendorRoute.get("/all",authenticate,authorize("Purchases","Vendors","view"), getAllVendors);
vendorRoute.get("/details/:ID",authenticate,authorize("Purchases","Vendors","view"),getVendorDetails);
vendorRoute.patch("/edit/:ID",authenticate,authorize("Purchases","Vendors","edit"),editVendorDetails);




module.exports = {
    vendorRoute
};
