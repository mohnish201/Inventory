import { Link } from "react-router-dom";

import { SidebarTab } from "./SidebarTab";
import { Accordion } from "@chakra-ui/react";
import { PiCirclesThreePlus } from "react-icons/pi";

import { Stack, Flex, Text } from "@chakra-ui/react";

import { useActive } from "../hooks/useActive.hook";

import { menu } from "../constants/pages";

const Sidebar = () => {
  const { isActive } = useActive();

  return (
    <Stack
      display={["none", "none", "none", "flex"]}
      p={3}
      bg={"brand.bg.primary"}
      userSelect={"none"}
      w={220}
      minW={220}
      overflow={"auto"}
      pt={6}
    >
      <Link to={"/"}>
        <Flex
          alignItems={"center"}
          gap={1}
          px={4}
          py={2}
          borderRadius={8}
          color={isActive("/") && "#fff"}
          bg={isActive("/") && "brand.accent"}
        >
          <PiCirclesThreePlus fontSize={20} />
          <Text> Dashboard </Text>
        </Flex>
      </Link>

      <Accordion allowToggle>
        {menu.map((item, index) => (
          <SidebarTab data={item} key={index} />
        ))}
      </Accordion>
    </Stack>
  );
};

export { Sidebar };
