import { PiChartDonut } from "react-icons/pi";
import { PiShoppingCart } from "react-icons/pi";
import { PiBag } from "react-icons/pi";

const menu = [
  {
    heading: "Inventory",
    icon: <PiChartDonut />,
    submenu: [
      {
        label: "Items",
        path: "/inventory/items",
      },
      // {
      //     label: 'Item Groups',
      //     path: '/inventory/groups'
      // },
      // {
      //     label: 'Price List',
      //     path: '/inventory/prices'
      // },
      // {
      //     label: 'Adjustments',
      //     path: '/inventory/adjustments'
      // }
    ],
  },
  {
    heading: "Sales",
    icon: <PiShoppingCart />,
    submenu: [
      {
        label: "Customers",
        path: "/sales/customers",
      },
      {
        label: "Invoices",
        path: "/sales/invoices",
      },
      {
        label: "Sales Orders",
        path: "/sales/orders",
      },
      // {
      //     label: 'Sales Returns',
      //     path: '/sales/returns'
      // },
      // {
      //     label: 'Delivery Challans',
      //     path: '/sales/delivery'
      // },
      {
        label: "Payment Received",
        path: "/sales/payments",
      },
    ],
  },
  {
    heading: "Purchase",
    icon: <PiBag />,
    submenu: [
      {
        label: "Vendor",
        path: "/purchase/vendors",
      },
      // {
      //     label: 'Bills',
      //     path: '/purchase/bills'
      // },
      //   {
      //     label: "Payments Made",
      //     path: "/purchase/payments",
      //   },
      // {
      //     label: 'Vendor Credits',
      //     path: '/purchase/credits'
      // },
      {
        label: "Purchase Orders",
        path: "/purchase/orders",
      },
      // {
      //     label: 'Purchase Receives',
      //     path: '/purchase/receives'
      // }
    ],
  },
];

export { menu };
