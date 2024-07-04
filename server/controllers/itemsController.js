const { Itemsmodel } = require("../models/itemsModel");
const mongoose = require("mongoose");
const { cloudinary } = require("../config/cloudinary");

const { pushObject, pushObjects, removeObject } = require("../utils/imageUploder")

require("dotenv").config();

const addNewItems = async (req, res) => {
  const {
    types,
    name,
    SKU,
    unit,
    dimensions,
    weight,
    manufacturer,
    category,
    warehouse,
    brand,
    UPC,
    EAN,
    MPN,
    ISBN,
    salesInformation,
    purchaseInformation,
    trackInventory,
    inventoryAccount,
    openingStock,
    reorderPoint,
    openingStockRatePerUnit,
  } = req.body;

  try {
    // Create a new item using the Itemsmodel

    const existingProduct = await Itemsmodel.findOne({ SKU });

    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    //Validate if the request contains multiple files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images provided" });
    }

    const maxImageSizeInBytes = 5 * 1024 * 1024; // 5 MB (adjust as needed)

    for (const file of req.files) {
      // Validate image size
      if (file.size > maxImageSizeInBytes) {
        return res.status(400).json({ message: `Image size exceeds the maximum allowed size` });
      }
    }

    // Upload images to S3
    const uploadedImages = await pushObjects(req.files);

    const newItem = new Itemsmodel({
      types,
      name,
      itemsImage: uploadedImages.map(image => image.key),
      SKU,
      unit,
      dimensions: JSON.parse(dimensions),
      weight,
      manufacturer,
      warehouse,
      category,
      brand,
      UPC,
      EAN,
      MPN,
      ISBN,
      salesInformation: JSON.parse(salesInformation),
      purchaseInformation: JSON.parse(purchaseInformation),
      trackInventory,
      inventoryAccount,
      openingStock,
      currentStock: openingStock,
      reorderPoint,
      openingStockRatePerUnit,
    });

    const savedItem = await newItem.save();

    res
      .status(201)
      .json({ message: "New Items Added Successfully", data: savedItem });
  } catch (error) {
    console.error("Error adding new item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// const getAllItems = async (req, res) => {
//   const { page=1, limit=0  } = req.query;

//   // Convert page to a number
//   const pageNumber = parseInt(page);
//   console.log(page,limit);
//   console.log(typeof(limit),typeof(pageNumber));
//   try {
//     let allProducts = await Itemsmodel.aggregate([
//       {
//         $match: {}
//       },
//       {
//         $addFields: {
//           "itemsImage": {
//             $map: {
//               input: "$itemsImage",
//               as: "image",
//               in: { $concat: [process.env.PUBLIC_AWS_BASE_URL, "$$image"] }
//             }
//           }
//         }
//       },
//       {
//         $skip: ((pageNumber - 1) *parseInt(limit)),
//       },
//       {
//         $limit: (parseInt(limit)),
//       },
//     ]);
//     const total = await Itemsmodel.countDocuments();
//     const pageEnd = Math.ceil(total / parseInt(limit));
//     res.status(200).json({ message: "All Items", data: allProducts, pageEnd });
//   } catch (error) {
//     console.error("Error while getting all items:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const getAllItems = async (req, res) => {
  const { page = 1, limit=0 } = req.query;

  // Convert page to a number
  const pageNumber = parseInt(page);

  try {
    let aggregationPipeline = [
      {
        $match: {}
      },
      {
        $addFields: {
          "itemsImage": {
            $map: {
              input: "$itemsImage",
              as: "image",
              in: { $concat: [process.env.PUBLIC_AWS_BASE_URL, "$$image"] }
            }
          }
        }
      },
      {
        $skip: (pageNumber - 1) * parseInt(limit) || 0,
      }
    ];

    // Add $limit stage only if limit is provided
    if (parseInt(limit)) {
      aggregationPipeline.push({
        $limit: parseInt(limit),
      });
    }
    let allProducts = await Itemsmodel.aggregate(aggregationPipeline);

    const total = await Itemsmodel.countDocuments();
    
    if (limit != 0) {
      pageEnd = Math.ceil(total / parseInt(limit));
    } else {
      pageEnd = 1;
    }

    res.status(200).json({ message: "All Items", data: allProducts, pageEnd });
  } catch (error) {
    console.error("Error while getting all items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



const getItemById = async (req, res) => {
  let { ID } = req.params;

  try {
    let product = await Itemsmodel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(ID) }
      },
      {
        $addFields: {
          "itemsImage": {
            $map: {
              input: "$itemsImage",
              as: "image",
              in: { $concat: [process.env.PUBLIC_AWS_BASE_URL, "$$image"] }
            }
          }
        }
      }
    ]);

    res.status(200).json({ message: "Product Details", data: product[0] });
  } catch (error) {
    console.error("Error while getting items details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



const removeItemById = async (req, res) => {
  const { ID } = req.params;

  try {

    const productDetails = await Itemsmodel.findByIdAndDelete(ID);
    productDetails.itemsImage.forEach(async (el) => {
      await removeObject(el);
    })
    if (!productDetails) {
      return res.status(400).json({ message: "Product Not Found" });
    }

    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const editItemDetails = async (req, res) => {

  try {
    const itemId = req.params.ID;
    const payload = req.body;
    let images = req.files || [];

    if (typeof payload.itemsImage === 'string') {
      payload.itemsImage = [payload.itemsImage];
    }

    payload.itemsImage = payload.itemsImage?.map((fullSource) => {
      const { pathname } = new URL(fullSource);
      return pathname.substring(1);
    }) || []

    payload.dimensions = JSON.parse(payload.dimensions);
    payload.purchaseInformation = JSON.parse(payload.purchaseInformation);
    payload.salesInformation = JSON.parse(payload.salesInformation);

    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      let { key } = await pushObject(file);
      payload.itemsImage.push(key);
    }

    let oldState = await Itemsmodel.findOne({ _id: itemId });

    const set = new Set(payload.itemsImage);

    for (let i = 0; i < oldState.itemsImage.length; i++) {
      const key = oldState.itemsImage[i];
      if (!set.has(key)) {
        await removeObject(key);
      }
    }

    await Itemsmodel.updateOne({ _id: itemId }, payload);
    res.status(200).json({ message: "Item details updated successfully" });
  } catch (error) {
    console.error("Error updating item details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeImageById = async (req, res) => {
  const { ID } = req.params;
  const { imageIndex } = req.body;

  try {
    // Find the item by ID
    const item = await Itemsmodel.findById(ID);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if the imageIndex is within the bounds of the array
    if (imageIndex < 0 || imageIndex >= item.itemsImage.length) {
      return res.status(400).json({ message: "Invalid image index" });
    }

    // Remove the image at the specified index
    item.itemsImage.splice(imageIndex, 1);

    // Save the updated item
    await item.save();

    return res.status(200).json({ message: "Image removed successfully", item });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};




module.exports = {
  addNewItems,
  getAllItems,
  getItemById,
  removeItemById,
  editItemDetails,
  removeImageById
};
