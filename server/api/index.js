const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connection } = require("../config/db");
const { customerRoute } = require("../routes/customerRoute");
const { itemsRoute } = require("../routes/itemsRoute");
const { brandRoute } = require("../routes/brandRoute");
const { warehouseRoute } = require("../routes/warehouseRoute");
const { manufacturerRoute } = require("../routes/manufacturerRoute");
const { roleRoute } = require("../routes/roleRoute");
const { userRoute } = require("../routes/userRoute");
const { vendorRoute } = require("../routes/vendorRoute");
const { currencyRoute } = require("../routes/currencyRoute");
const { salesOrderRoute } = require("../routes/salesOrderRoute");
const { categoryRoute } = require("../routes/categoryRoute");
const { purchaseOrderRoute } = require("../routes/purchaseOrderRoute");
const { organizationRoute } = require("../routes/organizationRoute");
const { invoiceRoute } = require("../routes/invoiceRoutes");
const { dashboardRoute } = require("../routes/dashboardDetailsRoute");

require("dotenv").config();

const app = express();

app.use(cors({ origin: "*" })); //CORS Policy

app.use(express.json()); //JSON
//app.use(cookieParser()); //cookieParser

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    msg: "Welcome to basic end point",
    cookieDomain: process.env.COOKIE_DOMAIN,
    AdminHost: process.env.ADMIN_HOSTED_URL,
    origin: process.env.ORIGIN,
  });
});

app.use("/customer", customerRoute);
app.use("/items", itemsRoute);
app.use("/brand", brandRoute);
app.use("/warehouse", warehouseRoute);
app.use("/manufacturer", manufacturerRoute);
app.use("/role", roleRoute);
app.use("/user", userRoute);
app.use("/vendor", vendorRoute);
app.use("/currency", currencyRoute);
app.use("/sales-order", salesOrderRoute);
app.use("/invoice", invoiceRoute);
app.use("/category", categoryRoute);
app.use("/purchase-order", purchaseOrderRoute);
app.use("/organization", organizationRoute);
app.use("/dashboard", dashboardRoute);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log(`Server is running at port ${process.env.PORT}`);
  } catch (error) {
    console.log("Not able to connect to DB");
    console.log("Error while connecting to DB", error);
  }
});
