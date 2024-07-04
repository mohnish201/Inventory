const { Manufacturermodel } = require("../models/manufacturerModel");
require("dotenv").config();

const getAllManufacturer = async (req, res) => {
  const { page = 1, limit = 0 } = req.query;

  // Convert page to a number
  const pageNumber = parseInt(page);
  try {
    let allManufacturers = await Manufacturermodel.find().skip((pageNumber - 1) * parseInt(limit)).limit(parseInt(limit));
    const total = await Manufacturermodel.countDocuments();
    if (limit != 0) {
      pageEnd = Math.ceil(total / parseInt(limit));
    } else {
      pageEnd = 1;
    }
    res.status(200).json({ "message": "All Manufacturers", "data": allManufacturers,pageEnd });
  } catch (error) {
    console.log("Error while getting all the manufacturers", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const addManufacturer = async (req, res) => {
  let { manufacturerName } = req.body;
  try {
    let newManufacture = new Manufacturermodel({
      manufacturerName
    })

    await newManufacture.save();
    res.status(201).json({ message: "New Manufacturer Added!" })
  } catch (error) {
    console.log("Error while adding new Manufacturer", error);
    res.status(500).json({ message: "Internal Server Error" })
  }
}

const removeManufacturer = async (req, res) => {
  let { ID } = req.params;
  try {

    const removedManufacturer = await Manufacturermodel.findByIdAndDelete(ID);

    if (!removedManufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }

    res.status(200).json({ message: 'Manufacturer removed successfully' });
  } catch (error) {
    console.log("Error while removing Manufacturer", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


const editManufacturer = async (req, res) => {
  try {
    const { ID } = req.params;
    const payload = req.body;


    const updatedManufacturer = await Manufacturermodel.findByIdAndUpdate(
      ID,
      payload,
      { new: true, runValidators: true }
    );

    // Check if the manufacturer exists
    if (!updatedManufacturer) {
      return res.status(404).json({ error: 'Manufacturer not found' });
    }

    // Send the updated manufacturer as the response
    res.status(200).json({message:"Manufacture details updated Successfully"});
  } catch (error) {
    console.log('Error editing manufacturer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getManufacturerDetailsById = async(req,res)=>{
  let {ID}= req.params;
  try {
    let manufacturer = await Manufacturermodel.findOne({_id:ID});
    res.status(200).json({ "message": "Manufacturers details", "data": manufacturer });
  } catch (error) {
    console.log("Error while getting the manufacturers details", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


module.exports = {
  addManufacturer,
  removeManufacturer,
  getAllManufacturer,
  editManufacturer,
  getManufacturerDetailsById
};
