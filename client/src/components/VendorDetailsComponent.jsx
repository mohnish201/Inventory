import React from "react";
import { Stack, Text, VStack, Box } from "@chakra-ui/react";
import ReactSelect from "react-select";

const VendorDetailsComponent = ({
  defaultValue,
  vendorId,
  vendorList,
  handleFieldChange,
  billingAddress,
  shippingAddress,
}) => {
  const vendorOptions = vendorList.reduce((options, vendor) => {
    options[vendor._id] = {
      value: vendor._id,
      label: vendor.displayName,
      name: "vendorId",
      billingAddress: vendor.billingAddress,
      shippingAddress: vendor.shippingAddress,
    };
    return options;
  }, {});

  const defaultValueOption =
    defaultValue && vendorOptions[defaultValue.vendor._id];
  return (
    <>
      {/* Vendor Name */}
      <Stack
        justifyContent={"left"}
        spacing={6}
        direction={{ base: "column", sm: "column", md: "row" }}
      >
        <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
          Vendor Name<span style={{ color: "red" }}>*</span>
        </Text>

        {/* Vendor Select dropdown */}
        <Box w={{ base: "100%", sm: "100%", md: "50%" }}>
          <ReactSelect
            name="vendorId"
            placeholder="Select a Vendor"
            options={Object.values(vendorOptions)} // Convert object values back to array
            onChange={handleFieldChange}
            defaultValue={defaultValueOption}
          />
        </Box>
      </Stack>
      {vendorId && (
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

export default VendorDetailsComponent;
