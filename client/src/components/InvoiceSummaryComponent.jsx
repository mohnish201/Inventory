import React from "react";
import {
  VStack,
  Table,
  Tfoot,
  Tr,
  Th,
  Td,
  Text,
  TableContainer,
  Input,
} from "@chakra-ui/react";
import { useCurrencyFormat } from "../hooks/useCurrrencyFormat";

const InvoiceSummaryComponent = ({
  subTotal,
  shippingCharges,
  otherCharges,
  total,
  handleFieldChange,
}) => {
  const { formatCurrency } = useCurrencyFormat();
  return (
    <VStack
      borderRadius={"10px"}
      border={"1px solid"}
      borderColor={"gray.300"}
      overflowX={"auto"}
    >
      <TableContainer w={"lg"}>
        <Table>
          <Tr>
            <Th>Sub Total</Th>
            <Td>{formatCurrency(subTotal)}</Td>
          </Tr>
          <Tr>
            <Td display={"flex"} columnGap={4} alignItems={"center"}>
              <Text fontSize={"sm"}>Shipping Charges</Text>
              <Input
                value={shippingCharges}
                name="shippingCharges"
                borderRadius={"6px"}
                placeholder="0.00"
                size={"sm"}
                type="number"
                onChange={handleFieldChange}
              />
            </Td>
            <Td>{formatCurrency(shippingCharges)}</Td>
          </Tr>

          <Tr>
            <Td display={"flex"} columnGap={8} alignItems={"center"}>
              <Text fontSize={"sm"}>Other Charges</Text>
              <Input
                value={otherCharges}
                name="otherCharges"
                placeholder="0.00"
                borderRadius={"6px"}
                size={"sm"}
                type="number"
                onChange={handleFieldChange}
              />
            </Td>
            <Td>{formatCurrency(otherCharges)}</Td>
          </Tr>

          <Tr>
            <Td fontSize={"sm"}>Round Off</Td>
            <Td>{formatCurrency(total)}</Td>
          </Tr>
          <Tfoot>
            <Td fontWeight={600}>Total(Rs)</Td>
            <Td fontWeight={600}>{formatCurrency(total)}</Td>
          </Tfoot>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default InvoiceSummaryComponent;
