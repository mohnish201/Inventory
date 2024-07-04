const express = require("express");
const {
  addNewCustomer,
  editCustomerDetails,
  getAllCustomers,
  getCustomerById,
  removeCustomer
} = require("../controllers/customerControllers");
const { authenticate } = require("../middlewares/authenticationMiddleware");
const { authorize } = require("../middlewares/authorizationMiddleware");

const customerRoute = express.Router();

customerRoute.post("/add",authenticate,authorize("Sales","Customer","create"), addNewCustomer);
customerRoute.patch("/edit/:ID", authenticate,authorize("Sales","Customer","edit"),editCustomerDetails);
customerRoute.get("/all",getAllCustomers);
customerRoute.get("/details/:ID", authenticate,authorize("Sales","Customer","view"),getCustomerById);
customerRoute.delete("/remove/:ID", authenticate,authorize("Sales","Customer","delete"),removeCustomer);



module.exports = {
  customerRoute
};
