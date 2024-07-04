const express = require("express");
const {
  getInvoice,
  getInvoicesById,
  createInvoice,
  deleteInvoice,
  editInvoiceDetails,
} = require("../controllers/invoiceController");
const { authenticate } = require("../middlewares/authenticationMiddleware");
const { authorize } = require("../middlewares/authorizationMiddleware");
const { pdfConverterController } = require("../controllers/pdfController");

const invoiceRoute = express.Router();

invoiceRoute.post(
  "/add",
  authenticate,
  authorize("Sales", "Invoices", "create"),
  createInvoice
);
invoiceRoute.get(
  "/all",
  authenticate,
  authorize("Sales", "Invoices", "view"),
  getInvoice
);
invoiceRoute.get(
  "/details/:ID",

  getInvoicesById
);
invoiceRoute.patch(
  "/edit/:ID",
  authenticate,
  authorize("Sales", "Invoices", "edit"),
  editInvoiceDetails
);
invoiceRoute.delete(
  "/remove/:ID",
  authenticate,
  authorize("Sales", "Invoices", "delete"),
  deleteInvoice
);
invoiceRoute.post(
  "/generatePdf",
  authenticate,
  authorize("Sales", "Invoices", "create"),
  pdfConverterController
);
// invoiceRoute.delete("/remove-items/:ID",deleteSales)

module.exports = {
  invoiceRoute,
};
