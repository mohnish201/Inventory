const express = require("express");
const {
    getAllCategory,
    addCategory,
    removeCategory,
    editCategoryDetails,
    getCategoryDetailsById
} = require("../controllers/categoryController");
const { authenticate } = require("../middlewares/authenticationMiddleware");
const { authorize } = require("../middlewares/authorizationMiddleware");

const categoryRoute = express.Router();

categoryRoute.get("/all",authenticate,authorize("Category","Category","view"), getAllCategory);
categoryRoute.post("/add",authenticate,authorize("Category","Category","create"), addCategory);
categoryRoute.patch("/edit/:ID",authenticate,authorize("Category","Category","edit"), editCategoryDetails);
categoryRoute.delete("/remove/:ID",authenticate,authorize("Category","Category","delete"), removeCategory);
categoryRoute.get("/details/:ID",authenticate,authorize("Category","Category","view"),getCategoryDetailsById);



module.exports = {
  categoryRoute
};
