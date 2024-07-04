const { Categorymodel } = require("../models/categoryModel");
let { Itemsmodel } = require("../models/itemsModel");
require("dotenv").config();

const getAllCategory = async (req, res) => {
  const { page = 1, limit = 0 } = req.query;

  // Convert page to a number
  const pageNumber = parseInt(page);
  try {
    let allCategory = await Categorymodel.find().skip((pageNumber - 1) * parseInt(limit)).limit(parseInt(limit));
    const total = await Categorymodel.countDocuments();
    if (limit != 0) {
      pageEnd = Math.ceil(total / parseInt(limit));
    } else {
      pageEnd = 1;
    }
    res.status(200).json({ message: "All Category", data: allCategory, pageEnd });
  } catch (error) {
    console.log("Error while getting all the category", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCategoryDetailsById = async (req, res) => {
  let { ID } = req.params;

  try {
    let categoryDetails = await Categorymodel.findOne({ _id: ID });
    res
      .status(200)
      .json({ message: "Category Details", data: categoryDetails });
  } catch (error) {
    console.log("Error while getting the category details", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addCategory = async (req, res) => {
  let { categoryName } = req.body;
  try {
    let newCategory = new Categorymodel({
      categoryName,
    });

    await newCategory.save();
    res.status(201).json({ message: "New Category Added!" });
  } catch (error) {
    console.log("Error while adding new category", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const removeCategory = async (req, res) => {
  let { ID } = req.params;
  try {
    let alreadyAssignedToItems = await Itemsmodel.findOne({ category: ID });
    if (alreadyAssignedToItems) {
      return res
        .status()
        .json({ message: "Category is assigned to some item" });
    }
    const removedCategory = await Categorymodel.findByIdAndDelete(ID);

    if (!removedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category removed successfully" });
  } catch (error) {
    console.log("Error while removing Category", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editCategoryDetails = async (req, res) => {
  const { ID } = req.params;
  const payload = req.body;

  try {
    const categoryDetails = await Categorymodel.findByIdAndUpdate(ID, payload, {
      new: true,
    });

    if (!categoryDetails) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category Details Updated Successfully" });
  } catch (error) {
    console.log("Error while editing category details", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllCategory,
  addCategory,
  removeCategory,
  editCategoryDetails,
  getCategoryDetailsById,
};
