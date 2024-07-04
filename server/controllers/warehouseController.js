const { Warehousemodel } = require("../models/warehouseModel");
require("dotenv").config();

const addWarehouse = async (req, res) => {
    let { warehouseName, address, phone } = req.body;
    try {
        let alreadyPrimary = await Warehousemodel.findOne({ isPrimary: true });
        if (alreadyPrimary) {
            let newWarehouse = new Warehousemodel({
                warehouseName,
                address,
                phone
            })
            await newWarehouse.save();
        } else {
            let newWarehouse = new Warehousemodel({
                warehouseName,
                address,
                phone,
                isPrimary: true
            })
            await newWarehouse.save();
        }

        res.status(201).json({ message: "New warehouse Added!" })
    } catch (error) {
        console.log("Error while adding new warehouse", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const removeWarehouse = async (req, res) => {
    try {
        const { ID } = req.params;

        const warehouse = await Warehousemodel.find({ _id: ID });

        // Check if the warehouse exists
        if (!warehouse) {
            return res.status(404).json({ message: 'Warehouse not found' });
        }

        // Check if the warehouse is marked as primary
        if (warehouse.isPrimary) {
            return res.status(400).json({ message: 'Cannot delete the primary warehouse. Set another warehouse as primary first.' });
        }

        // Remove the warehouse
        const removedWarehouse = await Warehousemodel.findByIdAndDelete(ID);

        // Check if the warehouse was successfully removed
        if (!removedWarehouse) {
            return res.status(500).json({ message: 'Failed to remove warehouse' });
        }

        res.status(200).json({ message: 'Warehouse removed successfully' });
    } catch (error) {
        console.log('Error while removing warehouse:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




const editWarehouse = async (req, res) => {

    try {
        const { ID } = req.params;
        const updatedWarehouseData = req.body;

        if (updatedWarehouseData.isPrimary) {
            const alreadyPrimary = await Warehousemodel.findOne({ isPrimary: true });
            if (alreadyPrimary) {
                return res.status(400).json({ message: "You cannot make two warehouses primary" });
            }
        }

        const warehouse = await Warehousemodel.findByIdAndUpdate(
            ID,
            updatedWarehouseData,
            { new: true, runValidators: true }
        );

        if (!warehouse) {
            return res.status(404).json({ message: "Warehouse not found" });
        }

        res.status(200).json({ message: "Warehouse updated successfully" });
    } catch (error) {
        console.log("Error while editing Warehouse details", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const getAllWarehouses = async (req, res) => {

    const { page = 1, limit = 0 } = req.query;

    // Convert page to a number
    const pageNumber = parseInt(page);

    try {
        const warehouses = await Warehousemodel.find().skip((pageNumber - 1) * parseInt(limit)).limit(parseInt(limit));
        const total = await Warehousemodel.countDocuments();
        if (limit != 0) {
            pageEnd = Math.ceil(total / parseInt(limit));
        } else {
            pageEnd = 1;
        }
        res.status(200).json({ message: "All Warehouses!", success: true, data: warehouses,pageEnd });
    } catch (error) {
        console.log("Error while getting all the warehouses", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const getWarehousesById = async (req, res) => {

    let { ID } = req.params
    try {
        const warehouse = await Warehousemodel.findOne({ _id: ID });
        res.status(200).json({ message: "Warehouses Details!", success: true, data: warehouse, });
    } catch (error) {
        console.log("Error while getting the warehouse details", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};





module.exports = {
    addWarehouse,
    removeWarehouse,
    editWarehouse,
    getAllWarehouses,
    getWarehousesById
};
