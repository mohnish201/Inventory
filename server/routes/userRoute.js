const express = require("express");
const {
    addUser,
    validateToken,
    userLogin,
    getAllUsers,
    editUserDetails,
    removeUser,
    logout,
    
} = require("../controllers/userController");
const { authenticate } = require("../middlewares/authenticationMiddleware");
const { authorize } = require("../middlewares/authorizationMiddleware");

const userRoute = express.Router();

userRoute.get("/validate",authenticate,validateToken);
userRoute.post("/register",authenticate,authorize("Users & Roles","Users","create"), addUser);
userRoute.get("/all",authenticate,authorize("Users & Roles","Users","view"), getAllUsers);
userRoute.post("/login", userLogin);
userRoute.get("/logout",logout)
userRoute.patch("/edit/:ID",authenticate,authorize("Users & Roles","Users","edit"), editUserDetails);
userRoute.delete("/remove/:ID",authenticate,authorize("Users & Roles","Users","delete"), removeUser);




module.exports = {
    userRoute
};
