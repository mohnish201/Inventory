import React, { useContext, useEffect, useMemo, useState } from "react";
import { Grid, Stack } from "@chakra-ui/react";
import {
  LiaFileInvoiceDollarSolid,
  LiaFileInvoiceSolid,
} from "react-icons/lia";
import { FiUser, FiUserCheck } from "react-icons/fi";
import { RiBillLine } from "react-icons/ri";
import DashboardElements from "../../components/DashboardElements";
import { NegativeChart } from "../../components/NegativeChart";
import { RecentAddedProducts } from "../../components/RecentAddedProducts";
import { FaBoxOpen } from "react-icons/fa";
import { getDashboardData } from "../../actions/dashboard.action";
import { Loading } from "../../components/Loading";
import { OrganizationContextProvider } from "../../providers/ContextProvider";
import { DashboardSkeleton } from "../../Skeletons/DashboardSkeleton";
import { DashboardTotalCost } from "../../components/DashboardTotalCost";
import { HiMiniBanknotes } from "react-icons/hi2";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyCheckAlt } from "react-icons/fa";

const Home = () => {
  const [data, setData] = useState({});
  const [fetching, setFetching] = useState(false);
  const { organizationData } = useContext(OrganizationContextProvider);

  const formatCurrency = useMemo(() => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: organizationData?.baseCurrency || "INR",
    });
  }, []);

  let loadData = async () => {
    setFetching(true);
    try {
      let data = await getDashboardData();
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setFetching(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (fetching) return <DashboardSkeleton />;

  return (
    <Stack
      // bgColor={"#f3fbff"}
      w={"100%"}
      justifyContent={"center"}
      spacing={10}
      p={6}
    >
      <Grid
        gridGap={6}
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        <DashboardTotalCost
          count={data?.totalPurchaseOrdersAmount}
          text={"Total Purchase Amount"}
          Icon={HiMiniBanknotes}
          color={"#F9FCFB"}
          IconColor={"#ff7d04"}
          bgColor={"#f4e9df"}
          formatCurency={formatCurrency}
        />

        <DashboardTotalCost
          count={data?.totalSalesOrdersAmount}
          text={"Total Sales Amount"}
          Icon={FaMoneyBillTrendUp}
          color={"#F9FCFB"}
          IconColor={"#04911a"}
          bgColor={"#defbdf"}
          formatCurency={formatCurrency}
        />

        <DashboardTotalCost
          count={data?.totalInvoicesAmount}
          text={"Total Invoices Amount"}
          Icon={FaMoneyCheckAlt}
          color={"#F9FCFB"}
          IconColor={"#04b0ff"}
          bgColor={"#c1f9ff"}
          formatCurency={formatCurrency}
        />
        <DashboardElements
          count={data?.totalPurchaseOrders}
          text={"Total Purchase Order"}
          Icon={LiaFileInvoiceDollarSolid}
          color={"#ff9e43"}
          href={"/purchase/orders"}
        />

        <DashboardElements
          count={data?.totalSalesOrders}
          text={"Total Sales Order"}
          Icon={RiBillLine}
          color={"#01cfe7"}
          href={"/sales/orders"}
        />

        <DashboardElements
          count={data?.totalInvoices}
          text={"Total Invoices"}
          Icon={LiaFileInvoiceSolid}
          color={"#1b2950"}
          href={"/sales/invoices"}
        />

        <DashboardElements
          count={data?.totalCustomers}
          text={"Total Customers"}
          Icon={FiUser}
          color={"#28c66f"}
          href={"/sales/customers"}
        />

        <DashboardElements
          count={data?.totalVendors}
          text={"Total Vendors"}
          Icon={FiUserCheck}
          color={"#FF3EA5"}
          href={"/purchase/vendors"}
        />

        <DashboardElements
          count={data?.totalItems}
          text={"Total Products"}
          Icon={FaBoxOpen}
          color={"#9718ff"}
          href={"/inventory/items"}
        />
      </Grid>

      <Stack
        direction={{ base: "column", lg: "row" }}
        justifyContent={"space-between"}
        w={"100%"}
        gap={4}
      >
        <NegativeChart />
        <RecentAddedProducts formatCurrency={formatCurrency} />
      </Stack>
    </Stack>
  );
};

export default Home;
