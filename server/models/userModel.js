const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            message: "Role Name is required"
        },
        email: {
            type: String,
            required: true,
            unique: true,
            message: "Email is required"
        },
        roleId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Roles",
            message: "Role Id is required"
        },
        password: {
            type: String,
            required: true,
            message: "Password is required"
        }
    },
    {
        timestamps: true,
    }
);

const Usermodel = mongoose.model("Users", userSchema);

module.exports = {
    Usermodel,
};
