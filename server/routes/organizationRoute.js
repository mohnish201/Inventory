const express = require("express");
const {
  addOrganization,
  editOrganizationalDetails,
  getOrganizationalDetails,
} = require("../controllers/organizationController");
const { authenticate } = require("../middlewares/authenticationMiddleware");
const { authorize } = require("../middlewares/authorizationMiddleware");
const upload = require("../config/multer");

const organizationRoute = express.Router();

organizationRoute.post(
  "/add",
  authenticate,
  authorize("Organization", "Organization Profile", "create"),
  upload.single("organizationLogo"),
  addOrganization
);
organizationRoute.get(
  "/details",
  authenticate,
  authorize("Organization", "Organization Profile", "view"),
  getOrganizationalDetails
);
organizationRoute.patch(
  "/edit",
  authenticate,
  authorize("Organization", "Organization Profile", "edit"),
  upload.single("organizationLogo"),
  editOrganizationalDetails
);

module.exports = {
  organizationRoute,
};
