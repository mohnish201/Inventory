const express = require("express");
const {
    getAllCurrency,
    getCurrencyDetails,
    addCurrency,
    removeCurrency,
    editCurrencyDetails
} = require("../controllers/currencyController");
const { authenticate } = require("../middlewares/authenticationMiddleware");
const { authorize } = require("../middlewares/authorizationMiddleware");

const currencyRoute = express.Router();

currencyRoute.get("/all",authenticate,authorize("Organization","Currencies","view"), getAllCurrency);
currencyRoute.get("/details/:ID",authenticate,authorize("Organization","Currencies","view"), getCurrencyDetails);
currencyRoute.post("/add",authenticate,authorize("Organization","Currencies","create"), addCurrency);
currencyRoute.patch("/edit/:ID",authenticate,authorize("Organization","Currencies","edit"), editCurrencyDetails);
currencyRoute.delete("/remove/:ID",authenticate,authorize("Organization","Currencies","delete"), removeCurrency);



module.exports = {
    currencyRoute
};
