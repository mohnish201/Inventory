const express = require("express");
const {
  addRole,
  getAllRole,
  editRoleDetails,
  getRoleDetailsById,
  removeRoleById
} = require("../controllers/roleController");
const { authenticate } = require("../middlewares/authenticationMiddleware");
const { authorize } = require("../middlewares/authorizationMiddleware");

const roleRoute = express.Router();

roleRoute.post("/add",authenticate,authorize("Users & Roles","Roles","create"), addRole);
roleRoute.get("/all",authenticate,authorize("Users & Roles","Roles","view"), getAllRole);
roleRoute.get("/details/:ID",authenticate,authorize("Users & Roles","Roles","view"), getRoleDetailsById);
roleRoute.patch("/edit/:ID",authenticate,authorize("Users & Roles","Roles","edit"), editRoleDetails);
roleRoute.delete("/remove/:ID",authenticate,authorize("Users & Roles","Roles","delete"), removeRoleById);



module.exports = {
  roleRoute
};
