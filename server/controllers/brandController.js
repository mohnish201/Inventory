const { Brandmodel } = require("../models/brandModel");
require("dotenv").config();


const getAllBrands = async (req, res) => {
    const { page=1, limit = 0 } = req.query;

    // Convert page to a number
    const pageNumber = parseInt(page);
    try {
        let allBrands = await Brandmodel.find().skip((pageNumber - 1) * parseInt(limit)).limit(parseInt(limit));
        const total = await Brandmodel.countDocuments();
        let pageEnd;
        if(limit!=0){
            pageEnd = Math.ceil(total / parseInt(limit));
        }else{
            pageEnd = 1;
        }
        res.status(200).json({ "message": "All brands", "data": allBrands ,pageEnd});
    } catch (error) {
        console.log("Error while getting all the brands", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const addBrand = async (req, res) => {
    let { brandName } = req.body;
    try {
        let newBrand = new Brandmodel({
            brandName
        })

        await newBrand.save();
        res.status(201).json({ message: "New Brand Added!" })
    } catch (error) {
        console.log("Error while adding new brand", error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


const removeBrand = async (req, res) => {
    let { ID } = req.params;
    try {

        const removedBrand = await Brandmodel.findByIdAndDelete(ID);

        if (!removedBrand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        res.status(200).json({ message: 'Brand removed successfully' });
    } catch (error) {
        console.log("Error while removing Brand", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const editBrandDetails = async (req, res) => {
    const { ID } = req.params;
    const payload = req.body;

    try {
        const brandDetails = await Brandmodel.findByIdAndUpdate(ID, payload, { new: true });

        if (!brandDetails) {
            return res.status(404).json({ message: "Brand not found" });
        }

        res.status(200).json({ message: "Brand Details Updated Successfully", data: brandDetails });
    } catch (error) {
        console.log("Error while editing brand details", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};






module.exports = {
    getAllBrands,
    addBrand,
    removeBrand,
    editBrandDetails
};
