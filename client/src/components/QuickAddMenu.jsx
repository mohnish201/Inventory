import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import quickMenuItems from "../constants/quickMenuItems.json";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";
const QuickAddMenu = () => {
  return (
    <Menu>
      <Tooltip
        hasArrow
        fontWeight={400}
        borderRadius={"6px"}
        fontSize={"sm"}
        px={4}
        py={1.5}
        label="Quick Create"
      >
        <MenuButton
          display={{ base: "none", sm: "block" }}
          size={"sm"}
          as={Button}
        >
          <MdAdd fontSize={"20px"} />
        </MenuButton>
      </Tooltip>
      <MenuList px={6} py={4}>
        <Flex columnGap={8}>
          {quickMenuItems.map((item) => (
            <VStack key={item?.category} spacing={1}>
              <Text mb={2} fontSize={"lg"} fontWeight={600}>
                {item?.category}
              </Text>
              {item?.menus.map((menu) => (
                <MenuItem key={menu.name} px={2} borderRadius={"6px"} py={1}>
                  <Link to={menu?.href}>
                    <Text
                      display={"flex"}
                      alignItems={"center"}
                      columnGap={2}
                      fontWeight={400}
                      fontSize={"md"}
                    >
                      <MdAdd /> {menu?.name}
                    </Text>
                  </Link>
                </MenuItem>
              ))}
            </VStack>
          ))}
        </Flex>
      </MenuList>
    </Menu>
  );
};

export default QuickAddMenu;
