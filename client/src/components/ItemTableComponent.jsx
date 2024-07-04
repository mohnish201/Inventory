import React from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  HStack,
  Box,
  VStack,
  Text,
  Thead,
  Th,
  TableContainer,
} from "@chakra-ui/react";
import { TiDelete } from "react-icons/ti";
import { useCurrencyFormat } from "../hooks/useCurrrencyFormat";

const ItemTableComponent = ({ itemDetails, handleDeleteItem }) => {
  const { formatCurrency } = useCurrencyFormat();
  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th textAlign={"center"} w={"md"}>
                ITEM DETAILS
              </Th>
              <Th textAlign={"center"}>QUANTITY</Th>
              <Th textAlign={"center"} isNumeric>
                RATE
              </Th>
              <Th textAlign={"center"} isNumeric>
                DISCOUNT
              </Th>
              <Th textAlign={"center"} isNumeric>
                AMOUNT
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {itemDetails.map((el) => (
              <Tr key={el?.name}>
                <Td>
                  <HStack spacing={4} align={"center"}>
                    <Box
                      w={10}
                      h={10}
                      bgSize={"contain"}
                      bgPos={"center"}
                      bgRepeat={"no-repeat"}
                      bgImage={el?.itemImage || el?.itemsImage[0]}
                    ></Box>
                    <VStack align={"left"}>
                      <Text fontWeight={600}>{el?.name}</Text>
                      <Text fontSize={"xs"} fontWeight={500}>
                        SKU:{el?.SKU}
                      </Text>
                    </VStack>
                  </HStack>
                </Td>
                <Td textAlign={"center"}>{el?.quantity}</Td>
                <Td textAlign={"center"}>{formatCurrency(el?.rate)}</Td>
                <Td textAlign={"center"}>{el?.discountPercent}%</Td>
                <Td textAlign={"center"}>{formatCurrency(el?.amount)}</Td>
                <Td textAlign={"center"}>
                  <TiDelete
                    cursor={"pointer"}
                    fontSize={"25px"}
                    color="red"
                    onClick={() => handleDeleteItem(el)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {itemDetails.length === 0 && (
        <Text p={4} w={"100%"} textTransform={"uppercase"} textAlign={"center"}>
          No Item Added
        </Text>
      )}
    </>
  );
};

export default ItemTableComponent;
