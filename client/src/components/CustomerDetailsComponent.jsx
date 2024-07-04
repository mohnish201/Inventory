import React from "react";
import { Stack, Text, VStack, Box } from "@chakra-ui/react";
import ReactSelect from "react-select";
import CustomerDetailsDrawer from "./CustomerDetailsDrawer";

const CustomerDetailsComponent = ({
  salesOrderValue,
  defaultValue,
  customerId,
  customerList,
  handleFieldChange,
  billingAddress,
  shippingAddress,
  isHide = false,
}) => {
  const customersOptions = customerList.reduce((options, customer) => {
    options[customer._id] = {
      value: customer._id,
      label: customer.displayName,
      name: "customerId",
      billingAddress: customer.billingAddress,
      shippingAddress: customer.shippingAddress,
      data: customer,
    };
    return options;
  }, {});

  const defaultValueOption =
    (defaultValue && customersOptions[defaultValue.customer._id]) ||
    (salesOrderValue && customersOptions[salesOrderValue.customer._id]);
  return (
    <>
      {/* Customer Name */}
      <Stack
        justifyContent={"left"}
        spacing={6}
        direction={{ base: "column", sm: "column", md: "row" }}
      >
        <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
          Customer Name<span style={{ color: "red" }}>*</span>
        </Text>

        {/* Customer Select dropdown */}
        <Box w={{ base: "100%", sm: "100%", md: "50%" }}>
          <ReactSelect
            name="customerId"
            placeholder="Select a Customer"
            options={Object.values(customersOptions)} // Convert object values back to array
            onChange={handleFieldChange}
            defaultValue={defaultValueOption}
          />
        </Box>
      </Stack>
      {customerId && !isHide && (
        <Stack
          ml={{ base: 2, sm: 2, md: "23%", lg: "23%" }}
          mt={4}
          direction={"row"}
          spacing={6}
        >
          <VStack fontSize={"sm"} spacing={1} align={"left"}>
            <Text fontSize={"sm"} fontWeight={600}>
              Billing Address
            </Text>
            {/* Billing Address  */}
            <Text>{billingAddress?.street}</Text>
            <Text>{billingAddress?.city}</Text>
            <Text>{billingAddress?.state}</Text>
            <Text>{billingAddress?.zipCode}</Text>
            <Text>{billingAddress?.country}</Text>
            <Text>
              Phone:
              {billingAddress?.phone}
            </Text>
          </VStack>
          <VStack fontSize={"sm"} spacing={1} align={"left"}>
            <Text fontSize={"sm"} fontWeight={600}>
              Shipping Address
            </Text>
            {/* Shipping Address details  */}
            <Text>{shippingAddress?.street}</Text>
            <Text>{shippingAddress?.city}</Text>
            <Text>{shippingAddress?.state}</Text>
            <Text>{shippingAddress?.zipCode}</Text>
            <Text>{shippingAddress?.country}</Text>
            <Text>
              Phone:
              {billingAddress?.phone}
            </Text>
          </VStack>
        </Stack>
      )}
    </>
  );
};

export default CustomerDetailsComponent;
