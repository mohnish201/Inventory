const { Organizationmodel } = require("../models/organizationModel");
const { pushObject, pushObjects, removeObject } = require("../utils/imageUploder")
require("dotenv").config();

const addOrganization = async (req, res) => {
  let {
    organizationName,
    industry,
    location,
    address,
    websiteUrl,
    primaryContact,
    baseCurrency,
  } = req.body;
  try {
    if (req.file) {
      const uploadedImage = await pushObject(req.file);

      let newOrganization = new Organizationmodel({
        organizationLogo: uploadedImage.key,
        organizationName,
        industry,
        location,
        address,
        websiteUrl,
        primaryContact,
        baseCurrency,
      });

      await newOrganization.save();
    } else {

      let newOrganization = new Organizationmodel({
        organizationName,
        industry,
        location,
        address,
        websiteUrl,
        primaryContact,
        baseCurrency,
      });

      await newOrganization.save();
    }

    res.status(201).json({ message: "New Organization Added!" });
  } catch (error) {
    console.log("Error while adding new Organization", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOrganizationalDetails = async (req, res) => {
  try {
    const organization = await Organizationmodel.findOne();

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    if (organization.organizationLogo) {
      // Concatenate baseUrl with organizationLogo
      organization.organizationLogo = `${process.env.PUBLIC_AWS_BASE_URL}${organization.organizationLogo}`;
    }
    res
      .status(200)
      .json({ message: "Organizational Details", data: organization });
  } catch (error) {
    console.log("Error while getting organizational details", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const editOrganizationalDetails = async (req, res) => {
  try {
    const updatedOrganizationalData = req.body;
    
    if (req.file) {
      const uploadedImage = await pushObject(req.file);
      updatedOrganizationalData.organizationLogo = uploadedImage.key;
    }
    updatedOrganizationalData.address=JSON.parse(updatedOrganizationalData.address)
    const organization = await Organizationmodel.updateOne(
      {},
      updatedOrganizationalData
    );

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json({ message: "Organization updated successfully" });
  } catch (error) {
    console.log("Error while editing Organization details", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addOrganization,
  getOrganizationalDetails,
  editOrganizationalDetails,
};
