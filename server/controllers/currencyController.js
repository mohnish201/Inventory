const { Currencymodel } = require("../models/currencyModel");
require("dotenv").config();

const getAllCurrency = async (req, res) => {
    const { page=1, limit = 0 } = req.query;

    // Convert page to a number
    const pageNumber = parseInt(page);
    try {
        const currency = await Currencymodel.find().skip((pageNumber - 1) * parseInt(limit)).limit(parseInt(limit));
        const total = await Currencymodel.countDocuments();
        if(limit!=0){
            pageEnd = Math.ceil(total / parseInt(limit));
        }else{
            pageEnd = 1;
        }
        res.status(200).json({ message: "All Currency", data: currency, pageEnd});
    } catch (error) {
        console.log("Error while getting all the currency", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getCurrencyDetails = async (req, res) => {
    let { ID } = req.params;
    try {
        const currencyDetails = await Currencymodel.findById(ID);
        if (!currencyDetails) {
            return res.status(404).json({ message: "Currency not found" });
        }
        res.status(200).json({ message: "Currency details", data: currencyDetails });
    } catch (error) {
        console.log("Error while getting paticular currency details", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const addCurrency = async (req, res) => {
    try {
        const { currencyCode, currencySymbol, currencyName, decimalPlace } = req.body;
        let alreadyExits = await Currencymodel.findOne({ currencyCode });
        if (alreadyExits) {
            return res.status(409).json({ message: "Currency Already Exit!" });
        }
        const newCurrency = new Currencymodel({
            currencyCode,
            currencySymbol,
            currencyName,
            decimalPlace
        });
        await newCurrency.save();
        res.status(201).json({ message: "New Currency added!" });
    } catch (error) {
        console.log("Error while getting adding currency", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const editCurrencyDetails = async (req, res) => {
    let { ID } = req.params
    try {
        const payload = req.body;
        const updatedCurrency = await Currencymodel.findByIdAndUpdate(
            ID,
            payload,
            { new: true }
        );
        if (!updatedCurrency) {
            return res.status(404).json({ message: "Currency not found" });
        }
        res.status(200).json({ message: "Currency details updated" });
    } catch (error) {
        console.log("Error while getting editing currency details", error)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const removeCurrency = async (req, res) => {
    let { ID } = req.params;
    try {
        const currency = await Currencymodel.findByIdAndDelete(ID);
        if (!currency) {
            return res.status(404).json({ message: "Currency not found" });
        }
        res.status(200).json({ message: "Currency deleted successfully" });
    } catch (error) {
        console.log("Error while removing currency", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    getAllCurrency,
    getCurrencyDetails,
    addCurrency,
    removeCurrency,
    editCurrencyDetails
};
