import { Link } from "react-router-dom";
import {
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Drawer,
  Avatar,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  IconButton,
  Tooltip,
  Icon,
  Center,
} from "@chakra-ui/react";

import { HiChevronDown } from "react-icons/hi2";
import { TbSettingsFilled } from "react-icons/tb";
import { RiExpandLeftLine, RiNotification4Fill } from "react-icons/ri";
import { MdOutlineSegment } from "react-icons/md";
import { PiCirclesThreePlus } from "react-icons/pi";
import { MdManageAccounts, MdAdd } from "react-icons/md";

import { useContext, useState } from "react";

import { useActive } from "../hooks/useActive.hook";
import { AuthContext } from "../providers/AuthValidationLayer";

import Cookies from "js-cookie";
import { SidebarTab } from "./SidebarTab";
import { Accordion } from "@chakra-ui/react";

import { menu } from "../constants/pages";
import { LogoutAlertDialog } from "./LogoutAlertDialog";
import QuickAddMenu from "./QuickAddMenu";

const Navbar = () => {
  const { isActive } = useActive();
  const { user } = useContext(AuthContext);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const onCloseAlert = () => setIsAlertOpen(false); // Function to close the alert dialog
  const onOpenAlert = () => setIsAlertOpen(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const logOut = () => {
    Cookies.remove("session");
    window.location.reload();
  };

  return (
    <Flex
      userSelect={"none"}
      h={14}
      borderBottom={"1px solid #f2f2f2"}
      position={"fixed"}
      inset={0}
      bg={"brand.bg.primary"}
      zIndex={999}
      px={4}
      alignItems={"center"}
      fontSize={18}
      color={"brand.text.secondary"}
      justifyContent={"space-between"}
    >
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerContent
          zIndex={900}
          bg={"brand.bg.primary"}
          w={220}
          maxW={220}
          borderRightRadius={6}
          boxShadow={"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"}
        >
          <DrawerHeader py={0}>
            <Flex
              color={"brand.text.primary"}
              alignItems={"center"}
              my={4}
              fontSize={20}
              gap={1}
            >
              <Image src="/favicon.ico" h={6} />
              <Text fontWeight={600}>Inventory</Text>
            </Flex>

            <DrawerCloseButton top={4}>
              <RiExpandLeftLine fontSize={18} />
            </DrawerCloseButton>
          </DrawerHeader>
          <DrawerBody p={3} userSelect={"none"}>
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
                <PiCirclesThreePlus />
                <Text> Dashboard </Text>
              </Flex>
            </Link>

            <Accordion allowToggle>
              {menu.map((item, index) => (
                <SidebarTab data={item} key={index} />
              ))}
            </Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <HStack spacing={4}>
        <Text display={["block", "block", "block", "none"]}>
          <MdOutlineSegment onClick={onOpen} fontSize={22} cursor={"pointer"} />
        </Text>
        <Flex
          color={"brand.text.primary"}
          alignItems={"center"}
          my={4}
          fontSize={20}
          gap={1}
        >
          <Image src="/favicon.ico" h={6} />
          <Text fontWeight={600}> Inventory </Text>
        </Flex>
      </HStack>

      <HStack alignItems={"center"} spacing={6}>
        <QuickAddMenu />
        <Flex alignItems={"center"} gap={6}>
          <Tooltip
            hasArrow
            fontWeight={400}
            borderRadius={"6px"}
            fontSize={"sm"}
            px={4}
            py={1.5}
            label="Settings"
          >
            <Link to={"/settings"}>
              <TbSettingsFilled fontSize={"20px"} cursor={"pointer"} />
            </Link>
          </Tooltip>

          <Tooltip
            hasArrow
            fontWeight={400}
            borderRadius={"6px"}
            fontSize={"sm"}
            px={4}
            py={1.5}
            label="Notifications"
          >
            <Center>
              <RiNotification4Fill fontSize={"20px"} cursor={"pointer"} />
            </Center>
          </Tooltip>
        </Flex>

        <Menu>
          <MenuButton>
            <Flex
              alignItems={"center"}
              gap={1}
              cursor={"pointer"}
              fontWeight={500}
            >
              <Text fontSize={16} display={["none", "none", "block", "block"]}>
                {user.name}
              </Text>
              <Avatar
                size={"2xs"}
                display={["block", "block", "none", "none"]}
              />
              <HiChevronDown fontSize={12} />
            </Flex>
          </MenuButton>

          <MenuList>
            <Link to={"/settings/users/manage"}>
              <MenuItem
                display={"flex"}
                alignItems={"center"}
                fontWeight={500}
                fontSize={"md"}
                columnGap={2}
              >
                <MdManageAccounts fontSize={"24px"} />
                Manage Users
              </MenuItem>
            </Link>

            <MenuItem fontWeight={500} fontSize={"md"} onClick={onOpenAlert}>
              <LogoutAlertDialog
                isOpen={isAlertOpen}
                onOpen={onOpenAlert}
                logout={logOut}
                onClose={onCloseAlert}
              />
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export { Navbar };
