import React from "react";
import { Stack, Text, VStack, Box } from "@chakra-ui/react";
import ReactSelect from "react-select";

const WarehouseDetailsComponent = ({
  defaultValue,
  warehouseId,
  warehouseList,
  handleFieldChange,
  warehouseAddress,
}) => {
  const warehouseOptions = warehouseList.reduce((options, warehouse) => {
    options[warehouse._id] = {
      value: warehouse._id,
      label: warehouse.warehouseName,
      name: "warehouseId",
      address: warehouse.address,
    };
    return options;
  }, {});

  const defaultValueOption =
    defaultValue && warehouseOptions[defaultValue.warehouse._id];
  return (
    <>
      {/* Warehouse Name */}
      <Stack
        justifyContent={"left"}
        spacing={6}
        mt={4}
        alignItems={"flex-start"}
        direction={{ base: "column", sm: "column", md: "row" }}
      >
        <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
          Delivery Address<span style={{ color: "red" }}>*</span>
        </Text>

        <Box w={{ base: "100%", sm: "100%", md: "50%" }}>
          <ReactSelect
            name="warehouseId"
            placeholder="Select Warehouse"
            options={Object.values(warehouseOptions)}
            onChange={handleFieldChange}
            defaultValue={defaultValueOption}
            isSearchable={true}
          />
          {warehouseId && (
            <Stack ml={2} mt={4} direction={"row"} spacing={6}>
              <VStack fontSize={"sm"} spacing={1} align={"left"}>
                <Text fontSize={"sm"} fontWeight={600}>
                  Address
                </Text>
                <Text>{warehouseAddress?.street}</Text>
                <Text>{warehouseAddress?.city}</Text>
                <Text>{warehouseAddress?.state}</Text>
                <Text>{warehouseAddress?.zipCode}</Text>
                <Text>{warehouseAddress?.country}</Text>
              </VStack>
            </Stack>
          )}
        </Box>
      </Stack>
    </>
  );
};

export default WarehouseDetailsComponent;
