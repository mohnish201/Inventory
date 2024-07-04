import {
  Flex,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useCurrencyFormat } from "../hooks/useCurrrencyFormat";

const UnpaidInvoicesTable = ({ data }) => {
  const { formatCurrency } = useCurrencyFormat();

  return (
    <Stack mt={10}>
      <Flex borderRadius={"6px"} p={2} bgColor={"#f8f8fa"}>
        <Text fontWeight={500}>Unpaid Invoices</Text>
      </Flex>

      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Invoice Number</Th>
              <Th textAlign={"right"}>Invoice Amount</Th>
              <Th textAlign={"right"}>Amount Due</Th>
              <Th textAlign={"right"}>Payment</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td></Td>
              <Td></Td>
              <Td textAlign={"right"}></Td>
              <Td textAlign={"right"}></Td>
              <Td textAlign={"right"}>
                <Input
                  borderRadius={"6px"}
                  placeholder="0.00"
                  w={150}
                  size={"sm"}
                  textAlign={"right"}
                  type="number"
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <Text fontSize={"sm"}>
        <span style={{ fontWeight: "500" }}>
          Total : {formatCurrency(76877687)}
        </span>
      </Text>
    </Stack>
  );
};

export { UnpaidInvoicesTable };
