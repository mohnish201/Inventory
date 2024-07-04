const mongoose = require("mongoose");
require("dotenv").config();

const roleSchema = mongoose.Schema(
    {
        roleName: {
            type: String,
            required: true,
            unique: true,
            message: "Role Name is required"
        },
        roleDescription: {
            type: String,
            required: true,
            message: "Role Description is required"
        },
        roleAccess: [{
            heading: {
                type: String,
                required: true,
                message: "Heading is required"
            },
            types: [{
                name: {
                    type: String,
                    required: true,
                    message: "Name is required"
                },
                access: [{
                    type: String,
                    enum: ["view", "create", "edit", "delete"],
                    default: [],
                    required: true,
                    message: "Access details is required"
                }]
            }]
        }]
    },
    {
        timestamps: true,
    }
);

const Rolemodel = mongoose.model("Roles", roleSchema);

module.exports = {
    Rolemodel,
};
