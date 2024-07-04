import { Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import React from "react";
import { SalesOrderInputForm } from "../../components/SalesOrderInputForm";

const CreateSalesOrder = () => {
  return (
    <Stack>
      <SalesOrderInputForm />
    </Stack>
  );
};

export default CreateSalesOrder;
