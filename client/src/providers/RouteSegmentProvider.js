import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Settings from "../pages/settings/Settings";
import ManageBrands from "../pages/brands/ManageBrands";
import CreateBrand from "../pages/brands/CreateBrand";
import CreateRole from "../pages/roles/CreateRole";
import ManageRoles from "../pages/roles/ManageRoles";
import EditRole from "../pages/roles/EditRole";
import CreateUser from "../pages/users/CreateUser";
import ManageUsers from "../pages/users/ManageUsers";
import Warehouses from "../pages/organisation/Warehouses";
import CreateWarehouse from "../pages/organisation/CreateWarehouse";
import EditWarehouse from "../pages/organisation/EditWarehouse";
import ManageVendors from "../pages/vendors/ManageVendors";
import CreateVendor from "../pages/vendors/CreateVendor";
import UpdateVendor from "../pages/vendors/UpdateVendor";
import ManageCurrency from "../pages/organisation/ManageCurrency";
import CreateCurrency from "../pages/organisation/CreateCurrency";
import EditCurrency from "../pages/organisation/EditCurrency";
import CreateCustomer from "../pages/customers/CreateCustomer";
import ManageCustomers from "../pages/customers/ManageCustomers";
import UpdateCustomer from "../pages/customers/UpdateCustomer";
import CreateManufacturer from "../pages/manufacturers/CreateManufacturer";
import UpdateManufacturer from "../pages/manufacturers/UpdateManufacturer";
import ManageManufacturer from "../pages/manufacturers/ManageManufacturer";
import CreateItem from "../pages/items/CreateItem";
import UpdateItem from "../pages/items/UpdateItem";
import ManageItems from "../pages/items/ManageItems";
import CreateCategory from "../pages/categories/CreateCategory";
import ManageCategory from "../pages/categories/ManageCategory";
import UpdateCategory from "../pages/categories/UpdateCategory";
import ManageSalesOrder from "../pages/salesOrder/ManageSalesOrder";
import CreateSalesOrder from "../pages/salesOrder/CreateSalesOrder";
import UpdateSalesOrder from "../pages/salesOrder/UpdateSalesOrder";
import ManagePurchaseOrder from "../pages/purchaseOrder/ManagePurchaseOrder";
import CreatePurchaseOrder from "../pages/purchaseOrder/CreatePurchaseOrder";
import UpdatePurchaseOrder from "../pages/purchaseOrder/UpdatePurchaseOrder";
import Profile from "../pages/organisation/Profile";
import ManageInvoice from "../pages/invoices/ManageInvoice";
import CreateInvoice from "../pages/invoices/CreateInvoice";
import UpdateInvoice from "../pages/invoices/UpdateInvoice";
import ManagePayment from "../pages/payment/ManagePayment";
import RecordPayment from "../pages/payment/RecordPayment";
import UpdatePayment from "../pages/payment/UpdatePayment";

const RouteSegmentProvider = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/settings" Component={Settings} />
      <Route path="/settings/brands/manage" Component={ManageBrands} />
      <Route path="/settings/brands/create" Component={CreateBrand} />
      <Route path="/settings/roles/manage" Component={ManageRoles} />
      <Route path="/settings/roles/create" Component={CreateRole} />
      <Route path="/settings/roles/manage/:id" Component={EditRole} />
      <Route path="/settings/users/manage" Component={ManageUsers} />
      <Route path="/settings/users/invite" Component={CreateUser} />
      <Route path="/settings/organisation/warehouses" Component={Warehouses} />
      <Route
        path="/settings/organisation/warehouses/create"
        Component={CreateWarehouse}
      />
      <Route
        path="/settings/organisation/warehouses/edit/:id"
        Component={EditWarehouse}
      />
      <Route path="purchase/vendors" Component={ManageVendors} />
      <Route path="purchase/vendors/create" Component={CreateVendor} />
      <Route path="purchase/vendors/manage/:id" Component={UpdateVendor} />
      <Route
        path="/settings/organisation/currencies/manage"
        Component={ManageCurrency}
      />
      <Route
        path="/settings/organisation/currencies/create"
        Component={CreateCurrency}
      />
      <Route
        path="/settings/organisation/currencies/manage/:id"
        Component={EditCurrency}
      />
      <Route path="/settings/organisation/profile" Component={Profile} />
      <Route path="/sales/customers" Component={ManageCustomers} />
      <Route path="/sales/customers/create" Component={CreateCustomer} />
      <Route path="/sales/customers/manage/:id" Component={UpdateCustomer} />
      <Route
        path="/settings/manufacturers/manage"
        Component={ManageManufacturer}
      />
      <Route
        path="/settings/manufacturers/create"
        Component={CreateManufacturer}
      />
      <Route
        path="/settings/manufacturers/manage/:id"
        Component={UpdateManufacturer}
      />
      <Route path="/inventory/items" Component={ManageItems} />
      <Route path="/inventory/items/create" Component={CreateItem} />
      <Route path="/inventory/items/manage/:id" Component={UpdateItem} />
      <Route path="/settings/categories/manage" Component={ManageCategory} />
      <Route path="/settings/categories/create" Component={CreateCategory} />
      <Route
        path="/settings/categories/manage/:id"
        Component={UpdateCategory}
      />
      <Route path="/sales/orders" Component={ManageSalesOrder} />
      <Route path="/sales/orders/create" Component={CreateSalesOrder} />
      <Route path="/sales/orders/manage/:id" Component={UpdateSalesOrder} />

      <Route path="/purchase/orders" Component={ManagePurchaseOrder} />
      <Route path="/purchase/orders/create" Component={CreatePurchaseOrder} />
      <Route
        path="/purchase/orders/manage/:id"
        Component={UpdatePurchaseOrder}
      />
      <Route path="/sales/invoices" Component={ManageInvoice} />
      <Route path="/sales/invoices/create" Component={CreateInvoice} />
      <Route path="/sales/invoices/manage/:id" Component={UpdateInvoice} />

      <Route path="/sales/payments/manage/:id" Component={UpdatePayment} />
      <Route path="/sales/payments/record" Component={RecordPayment} />
      <Route path="/sales/payments" Component={ManagePayment} />
    </Routes>
  );
};

export default RouteSegmentProvider;
