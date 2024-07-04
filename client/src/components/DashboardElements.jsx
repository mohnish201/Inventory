import { Box, GridItem, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const DashboardElements = ({ count, text, Icon, color, href }) => {
  return (
    <Link to={href}>
      <GridItem
        _hover={{
          boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;",
        }}
        transition={"all 0.3s"}
        justifyContent={"space-between"}
        py={2}
        px={4}
        alignItems={{ base: "flex-start", sm: "center" }}
        flexBasis={0}
        display={"flex"}
        borderRadius={"6px"}
        gap={{ base: 0, sm: 4 }}
        bgColor={color}
        color={"#fff"}
        flexDirection={{ base: "column-reverse", sm: "row" }}
      >
        <VStack spacing={2} align={"left"}>
          <Text fontWeight={600} fontSize={"lg"}>
            {count || 0}
          </Text>
          <Text fontWeight={500} fontSize={"sm"}>
            {text}
          </Text>
        </VStack>

        <Box display={{ base: "none", sm: "block" }}>
          {<Icon fontSize={36} />}
        </Box>
      </GridItem>
    </Link>
  );
};

export default DashboardElements;
