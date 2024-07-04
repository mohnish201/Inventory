const { Vendorsmodel } = require("../models/vendorModel");
require("dotenv").config();

const addNewVendor = async (req, res) => {
  const {
    salutation,
    firstName,
    lastName,
    companyName,
    displayName,
    email,
    mobileNo,
    PAN,
    GSTNo,
    currency,
    paymentTerms,
    TDS,
    billingAddress,
    shippingAddress,
    contactPerson,
    bankDetails,
    remark
  } = req.body;

  try {
    // Check if customer with the provided email already exists
    const existingVendor = await Vendorsmodel.findOne({ email });

    if (existingVendor) {
      return res
        .status(400)
        .json({ message: "Vendor with this email already exists" });
    }

    // If no existing customer, create a new one
    const newVendor = new Vendorsmodel({
      salutation,
      firstName,
      lastName,
      companyName,
      displayName,
      email,
      mobileNo,
      PAN,
      GSTNo,
      currency,
      paymentTerms,
      TDS,
      billingAddress,
      shippingAddress,
      contactPerson,
      bankDetails,
      remark
    });

    // Save the new customer to the database
    await newVendor.save();

    // Respond with the newly created customer
    res.status(201).json({ message: "New Vendor added successfully" });
  } catch (error) {
    console.error("Error while adding new Vendor", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const removeVendor = async (req, res) => {
  const { ID } = req.params;

  try {
    // Find the customer by ID and remove it
    const deletedVendor = await Vendorsmodel.findOneAndDelete({ _id: ID });

    // If customer not found, return a 404 error
    if (!deletedVendor) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Respond with a success message
    res.status(200).json({ message: "Vendor removed successfully" });
  } catch (error) {
    console.error("Error while removing vendor", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getAllVendors = async (req, res) => {

  const { page = 1, limit = 0 } = req.query;

  // Convert page to a number
  const pageNumber = parseInt(page);
  try {
    const allVendors = await Vendorsmodel.find().skip((pageNumber - 1) * parseInt(limit)).limit(parseInt(limit));
    const total = await Vendorsmodel.countDocuments();
    if (limit != 0) {
      pageEnd = Math.ceil(total / parseInt(limit));
    } else {
      pageEnd = 1;
    }
    res.status(200).json({ message: "All vendors retrieved successfully", data: allVendors,pageEnd });
  } catch (error) {
    console.error("Error while getting all vendors", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const editVendorDetails = async (req, res) => {

  const { ID } = req.params;
  const payload = req.body;

  try {

    const updatedVendor = await Vendorsmodel.findByIdAndUpdate(
      ID,
      payload,
      { new: true, runValidators: true }
    );

    // Check if the vendor exists
    if (!updatedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // Respond with the updated user
    return res.status(200).json({ message: 'Vendor details updated successfully' });
  } catch (error) {
    console.error("Error while editing details of vendor", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

}

const getVendorDetails = async (req, res) => {
  let { ID } = req.params
  try {
    const vendorsDetails = await Vendorsmodel.findOne({ _id: ID });
    res.status(200).json({ message: "Vendors retrieved successfully", data: vendorsDetails });
  } catch (error) {
    console.error("Error while getting vendors details", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


module.exports = {
  addNewVendor,
  removeVendor,
  getAllVendors,
  editVendorDetails,
  getVendorDetails
}