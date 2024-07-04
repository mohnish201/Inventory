const { Rolemodel } = require("../models/roleModel");
const { Usermodel } = require("../models/userModel");
require("dotenv").config();

const addRole = async (req, res) => {
    let { roleName, roleDescription, roleAccess } = req.body;
    try {
        let newRole = new Rolemodel({
            roleName,
            roleDescription,
            roleAccess
        })

        await newRole.save();
        res.status(201).json({ message: "New Role Added!" })
    } catch (error) {
        console.log("Error while adding new Role", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


const editRoleDetails = async (req, res) => {
    const { ID } = req.params;
    const payload = req.body;

    try {

        const updatedRole = await Rolemodel.findByIdAndUpdate(
            ID,
            payload,
            { new: true, runValidators: true }
        );

        if (!updatedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }

        return res.status(200).json({ message: 'Role details updated successfully' });
    } catch (error) {
        console.error("Error while editing details of role", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllRole = async (req, res) => {
    const { page = 1, limit = 0 } = req.query;

    // Convert page to a number
    const pageNumber = parseInt(page);
    try {
        let allRoles = await Rolemodel.find().skip((pageNumber - 1) * parseInt(limit)).limit(parseInt(limit));
        const total = await Rolemodel.countDocuments();
        if (limit != 0) {
            pageEnd = Math.ceil(total / parseInt(limit));
        } else {
            pageEnd = 1;
        }
        res.status(200).json({ "message": "All roles", "data": allRoles,pageEnd });
    } catch (error) {
        console.log("Error while getting all the roles", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getRoleDetailsById = async (req, res) => {
    let { ID } = req.params;
    try {
        let roleDetails = await Rolemodel.findOne({ _id: ID });

        if (!roleDetails) {
            return res.status(404).json({ message: "Role not found" });
        }

        res.status(200).json({ message: "Role details", data: roleDetails });
    } catch (error) {
        console.error("Error while getting role details", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const removeRoleById = async (req, res) => {

    try {
        const { ID } = req.params;

        const role = await Rolemodel.findOne({ _id: ID });
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        let alreadyAssignRoleUser = await Usermodel.findOne({ roleId: ID });

        if (alreadyAssignRoleUser) {
            return res.status(403).json({ message: "Role is assigned to someone you cannot remove this" });
        } else {
            let removeRole = await Rolemodel.findByIdAndDelete(ID);
            res.status(200).json({ message: 'Role removed successfully' });
        }
    } catch (error) {
        console.error("Error while removing role", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};





module.exports = {
    addRole,
    editRoleDetails,
    getAllRole,
    getRoleDetailsById,
    removeRoleById
};
