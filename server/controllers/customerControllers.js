const { Customermodel } = require("../models/customerModel");
require("dotenv").config();

const addNewCustomer = async (req, res) => {
  const {
    customerType,
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
    billingAddress,
    shippingAddress,
    contactPerson,
    bankDetails,
    paymentTerms,
    TDS
  } = req.body;

  try {
    // Check if customer with the provided email already exists
    const existingCustomer = await Customermodel.findOne({ email });

    if (existingCustomer) {
      return res
        .status(400)
        .json({ message: "Customer with this email already exists" });
    }

    // If no existing customer, create a new one
    const newCustomer = new Customermodel({
      customerType,
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
      billingAddress,
      shippingAddress,
      contactPerson,
      bankDetails,
      paymentTerms,
      TDS
    });

    // Save the new customer to the database
    await newCustomer.save();

    // Respond with the newly created customer
    res.status(201).json({ message: "New Customer added successfully" });
  } catch (error) {
    console.error("Error while adding new Customer", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const editCustomerDetails = async (req, res) => {
  const { ID } = req.params;
  const payload = req.body;

  try {
    // Use findByIdAndUpdate to find and update the customer by ID
    const updatedCustomer = await Customermodel.findByIdAndUpdate(
      ID,
      payload,
      { new: true, runValidators: true }
    );

    // If customer not found, return an error
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Respond with the updated customer
    res.status(200).json({ "message": "Customer details updated successfully", "data": updatedCustomer });
  } catch (error) {
    console.error("Error while editing Customer details", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getAllCustomers = async (req, res) => {

  const { page=1 , limit = 0 } = req.query;

  // Convert page to a number
  const pageNumber = parseInt(page);
  try {
    // Find all customers in the database
    let allCustomers = await Customermodel.find().skip((pageNumber - 1) * parseInt(limit)).limit(parseInt(limit));
    const total = await Customermodel.countDocuments();
    if(limit!=0){
      pageEnd = Math.ceil(total / parseInt(limit));
  }else{
      pageEnd = 1;
  }
    // Respond with the list of all customers
    res.status(200).json({ message: "All customers", "data": allCustomers ,pageEnd});
  } catch (error) {
    console.error("Error while getting Customers", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getCustomerById = async (req, res) => {
  const { ID } = req.params;

  try {
    // Find the customer by ID
    const customer = await Customermodel.findOne({ _id: ID });

    // If customer not found, return a 404 error
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Respond with the customer details
    res.status(200).json({ message: "Customer details", "data": customer });
  } catch (error) {
    console.error("Error while getting customer details", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const removeCustomer = async (req, res) => {
  const { ID } = req.params;

  try {
    // Find the customer by ID and remove it
    const deletedCustomer = await Customermodel.findByIdAndDelete(ID);

    // If customer not found, return a 404 error
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Respond with a success message
    res.status(200).json({ message: "Customer removed successfully", data: deletedCustomer });
  } catch (error) {
    console.error("Error while removing customer", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = {
  addNewCustomer,
  editCustomerDetails,
  getAllCustomers,
  getCustomerById,
  removeCustomer
};
