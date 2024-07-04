const express = require("express");
const {
  addNewItems,
  getAllItems,
  getItemById,
  removeItemById,
  editItemDetails,
  removeImageById
} = require("../controllers/itemsController");
const { authenticate } = require("../middlewares/authenticationMiddleware");
const { authorize } = require("../middlewares/authorizationMiddleware");
const upload = require("../config/multer");

const itemsRoute = express.Router();

itemsRoute.post("/add", authenticate,authorize("Inventory","Items","create"),upload.array("itemsImage",5),addNewItems);
itemsRoute.get("/all",getAllItems);
itemsRoute.get("/details/:ID",authenticate,authorize("Inventory","Items","view"), getItemById);
itemsRoute.patch("/edit/:ID",authenticate,authorize("Inventory","Items","edit"),upload.array("itemsImage",5), editItemDetails);
itemsRoute.delete("/remove/:ID",authenticate,authorize("Inventory","Items","delete"), removeItemById);

module.exports = {
  itemsRoute,
};
