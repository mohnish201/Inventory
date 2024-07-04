import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Flex, Select, VStack } from "@chakra-ui/react";
import { getChartData } from "../actions/dashboard.action";
import { getCurrentYear, yearsArray } from "../constants/years";

const NegativeChart = () => {
  const [year, setYear] = useState(getCurrentYear());
  const [data, setData] = useState({
    purchaseOrdersByMonth: [],
    salesOrdersByMonth: [],
  });

  const options = {
    chart: {
      type: "column",
      height: (6 / 9) * 100 + "%",
      width: 550,
    },
    title: {
      text: "Purchase & Sales",
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      width: "100%",
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        borderRadius: "50%",
      },
    },
    series: [
      {
        name: "Sales",
        data: data?.salesOrdersByMonth,
        color: "#65B741",
      },
      {
        name: "Purchase",
        data: data?.purchaseOrdersByMonth,
        color: "#FE0000",
      },
    ],
  };

  const loadChartData = async () => {
    try {
      let data = await getChartData(year);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadChartData();
  }, [year]);
  return (
    <VStack
      border={"1px solid #cfcdcd"}
      w={{ base: "100%", lg: "60%" }}
      p={4}
      borderRadius={"10px"}
      overflow={"auto"}
      bgColor={"#fff"}
    >
      <Flex justify="flex-end" w="100%">
        <Select
          size={"sm"}
          borderRadius={"6px"}
          w={"100px"}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {yearsArray.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </Flex>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </VStack>
  );
};

export { NegativeChart };
