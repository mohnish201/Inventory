import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getItems } from "../actions/item.action";
import { Link } from "react-router-dom";
import { getRecentItems } from "../actions/dashboard.action";
import { useCurrencyFormat } from "../hooks/useCurrrencyFormat";

const RecentAddedProducts = () => {
  const [products, setProducts] = useState([]);
  const { formatCurrency } = useCurrencyFormat();
  useEffect(() => {
    let loadProducts = async () => {
      try {
        let data = await getRecentItems();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadProducts();
  }, []);
  return (
    <Box
      bgColor={"#fff"}
      borderRadius={"10px"}
      border={"1px solid #d2d2d2"}
      p={4}
      w={{ base: "100%", lg: "40%" }}
    >
      <Heading color={"#000"} as={"h3"} ml={4} fontSize={"lg"}>
        Recently Added Products
      </Heading>

      <TableContainer mt={4}>
        <Table fontSize={"sm"} variant="simple">
          <Thead>
            <Tr>
              <Th pl={0} textAlign={"center"}>
                S.No
              </Th>
              <Th textAlign={"center"}>Products</Th>
              <Th textAlign={"center"} isNumeric>
                Price
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product, index) => (
              <Tr key={product?._id}>
                <Td pl={0} textAlign={"center"}>
                  {index + 1}
                </Td>
                <Td maxW={180} textAlign={"center"}>
                  <Link to={`/inventory/items/manage/${product._id}`}>
                    <HStack>
                      <Box w={"30px"}>
                        <Image
                          src={product?.itemsImage[0]}
                          alt={product?.name}
                        />
                      </Box>

                      <Text overflow={"hidden"} textOverflow={"ellipsis"}>
                        {product?.name}
                      </Text>
                    </HStack>
                  </Link>
                </Td>
                <Td textAlign={"center"} isNumeric>
                  {formatCurrency(product?.salesInformation?.sellingPrice)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {!products.length && (
        <VStack pt={16} spacing={0}>
          <Image src="/emptybox.png" alt="Empty Box" w={16} />
          <Text fontWeight={500} textAlign={"center"} p={2} size={"md"}>
            No Item Added Yet...
          </Text>

          <Text fontSize={"sm"}>Get Started by adding a items</Text>
        </VStack>
      )}
    </Box>
  );
};

export { RecentAddedProducts };
