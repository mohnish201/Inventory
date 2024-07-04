import { Box, GridItem, Text, VStack } from "@chakra-ui/react";
import React from "react";

const DashboardTotalCost = ({
  count,
  text,
  Icon,
  color,
  bgColor,
  IconColor,
  formatCurency,
}) => {
  return (
    <GridItem
      cursor={"pointer"}
      _hover={{
        boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;",
      }}
      transition={"all 0.3s"}
      py={2}
      px={4}
      alignItems={{ base: "flex-start", sm: "center" }}
      flexBasis={0}
      display={"flex"}
      borderRadius={"6px"}
      gap={{ base: 0, sm: 4 }}
      bgColor={color}
      border={"1px solid #e7e6e6"}
      color={"#000"}
      flexDirection={{ base: "column-reverse", sm: "row" }}
    >
      <Box
        borderRadius={"50%"}
        bgColor={bgColor}
        color={IconColor}
        display={{ base: "none", sm: "block" }}
        p={3}
      >
        {<Icon fontSize={22} />}
      </Box>
      <VStack spacing={2} align={"left"}>
        <Text fontWeight={600} fontSize={"md"}>
          {formatCurency.format(count) || 0}
        </Text>
        <Text fontWeight={500} fontSize={"sm"}>
          {text}
        </Text>
      </VStack>
    </GridItem>
  );
};

export { DashboardTotalCost };
