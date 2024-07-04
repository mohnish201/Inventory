import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Heading,
  Input,
  Stack,
  Table,
  Td,
  Text,
  Th,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { PiUserListLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const CustomerDetailsDrawer = ({ customerData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { data } = customerData;
  return (
    <>
      <Button
        ref={btnRef}
        leftIcon={<PiUserListLight fontSize={"20px"} />}
        colorScheme="blue"
        onClick={onOpen}
        variant={"link"}
        size={"sm"}
      >
        View Customer Details
      </Button>
      <Drawer
        size={"sm"}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack spacing={4}>
              <Avatar size={"md"} bg={"#F6F5F5"} name={data?.displayName} />

              <VStack align={"left"} spacing={0}>
                <Text color={"gray"} fontSize={"xs"} fontWeight={500}>
                  Customer
                </Text>

                <Link to={`/sales/customers/manage/${data._id}`}>
                  <Text
                    display={"flex"}
                    alignItems={"center"}
                    _hover={{ color: "blue" }}
                    fontSize={"md"}
                    columnGap={2}
                  >
                    {data?.displayName}
                    <FaArrowUpRightFromSquare
                      fontSize={"12px"}
                      fontWeight={400}
                    />
                  </Text>
                </Link>
              </VStack>
            </HStack>
          </DrawerHeader>

          <DrawerBody
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"left"}
            rowGap={6}
            mb={4}
          >
            {/* Contact Details */}
            <VStack
              borderRadius={"6px"}
              align={"left"}
              border={"1px solid #c4c3c3"}
            >
              <Flex
                bgColor={"#e2e2e2"}
                borderBottom={"1px solid #c4c3c3"}
                p={2}
              >
                <Text fontWeight={500}>Contact Details</Text>
              </Flex>

              <Table size={"sm"} fontSize={"sm"}>
                <Tr>
                  <Td fontWeight={500}>Customer Type</Td>
                  <Td>{data?.customerType}</Td>
                </Tr>

                <Tr>
                  <Td fontWeight={500}>Payment Terms</Td>
                  <Td>{data?.paymentTerms}</Td>
                </Tr>

                {data.customerType.toLowerCase() === "business" && (
                  <Tr>
                    <Td fontWeight={500}>Company Name</Td>
                    <Td>{data?.companyName}</Td>
                  </Tr>
                )}

                <Tr>
                  <Td fontWeight={500}>Email</Td>
                  <Td>{data?.email}</Td>
                </Tr>

                <Tr>
                  <Td fontWeight={500}>Mobile No.</Td>
                  <Td>{data?.mobileNo}</Td>
                </Tr>

                <Tr>
                  <Td fontWeight={500}>PAN</Td>
                  <Td>{data?.PAN}</Td>
                </Tr>

                <Tr>
                  <Td></Td>
                </Tr>
              </Table>
            </VStack>

            {/* Address */}
            <VStack
              borderRadius={"6px"}
              align={"left"}
              border={"1px solid #c4c3c3"}
            >
              <Flex
                bgColor={"#e2e2e2"}
                borderBottom={"1px solid #c4c3c3"}
                p={2}
              >
                <Text fontWeight={500}>Address</Text>
              </Flex>

              <Stack p={4} spacing={6}>
                <VStack fontSize={"sm"} spacing={1} align={"left"}>
                  <Text fontSize={"sm"} fontWeight={600}>
                    Billing Address
                  </Text>
                  {/* Billing Address  */}
                  <Text>{data?.billingAddress?.street}</Text>
                  <Text>{data?.billingAddress?.city}</Text>
                  <Text>{data?.billingAddress?.state}</Text>
                  <Text>{data?.billingAddress?.zipCode}</Text>
                  <Text>{data?.billingAddress?.country}</Text>
                  <Text>
                    Phone:
                    {data?.billingAddress?.phone}
                  </Text>
                </VStack>

                <hr />

                <VStack fontSize={"sm"} spacing={1} align={"left"}>
                  <Text fontSize={"sm"} fontWeight={600}>
                    Shipping Address
                  </Text>
                  {/* Shipping Address details  */}
                  <Text>{data?.shippingAddress?.street}</Text>
                  <Text>{data?.shippingAddress?.city}</Text>
                  <Text>{data?.shippingAddress?.state}</Text>
                  <Text>{data?.shippingAddress?.zipCode}</Text>
                  <Text>{data?.shippingAddress?.country}</Text>
                  <Text>
                    Phone:
                    {data?.shippingAddress?.phone}
                  </Text>
                </VStack>
              </Stack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CustomerDetailsDrawer;
