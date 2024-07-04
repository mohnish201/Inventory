import {
  Checkbox,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { MdPayment } from "react-icons/md";
import CustomerDetailsComponent from "./CustomerDetailsComponent";
import { getCustomers } from "../actions/customer.action";
import { OrganizationContextProvider } from "../providers/ContextProvider";
import CustomerDetailsDrawer from "./CustomerDetailsDrawer";
import { UnpaidInvoicesTable } from "./UnpaidInvoicesTable";
import { useCurrencyFormat } from "../hooks/useCurrrencyFormat";

const initState = {
  customerId: "",
  amount: 0,
  bankCharges: 0,
  paymentDate: "",
  paymentMode: "",
  reference: "",
  taxDeduction: "No",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.name]: action.value };

    case "ADD_TABLE_ROW":
      return { ...state, itemDetails: [...state.itemDetails, action.row] };

    case "SAVE_FORM_DATA":
      return { ...state, ...action.payload };

    case "UPDATE_SALES_ORDER_NUMBER":
      return { ...state, salesOrderNo: `SO-${action.payload}` };

    case "UPDATE_SUB_TOTAL":
      return { ...state, subTotal: action.subTotal };

    case "UPDATE_ITEM_DETAILS":
      return { ...state, itemDetails: action.itemDetails };

    case "UPDATE_TOTAL":
      return {
        ...state,
        total: +state.subTotal + +state.shippingCharges + +state.otherCharges,
      };

    case "RESET":
      return initState;

    default:
      return state;
  }
};
const PaymentInputForm = ({ defaultValue }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [customerList, setCustomerList] = useState([]);
  const [billingAddress, setBillingAddress] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [customerData, setCustomerData] = useState({});
  const [fetching, setFetching] = useState([]);
  const { organizationData } = useContext(OrganizationContextProvider);

  const {
    customerId,
    amount,
    bankCharges,
    paymentDate,
    paymentMode,
    reference,
    taxDeduction,
  } = state;

  const { formatCurrency } = useCurrencyFormat();

  // Function to handle changes in input fields
  const handleFieldChange = (e) => {
    if (!e.target) {
      const { name, value } = e;

      if (name == "customerId") {
        setCustomerData(e);
      }

      if (name == "taxDeduction") {
        value = e;
        console.log(e);
      }
      setShippingAddress(e.shippingAddress);
      setBillingAddress(e.billingAddress);
      dispatch({ type: "UPDATE_FIELD", name, value });
    } else {
      const { name, value } = e.target;
      dispatch({ type: "UPDATE_FIELD", name, value });
    }
  };

  useEffect(() => {
    const load = async () => {
      setFetching(true);
      try {
        let customers = await getCustomers();
        // let items = await getItems();
        setCustomerList(customers.data);
        // setItemsList(items.data);
      } catch (error) {
        console.log(error);
      }

      setFetching(false);
    };

    load();
  }, []);
  return (
    <Stack mb={10} px={4}>
      {/* Header */}
      <Flex
        direction={{ base: "column", sm: "row" }}
        justifyContent={"space-between"}
        alignItems={{ base: "flex-start", sm: "center" }}
      >
        <HStack>
          <MdPayment fontSize={24} />
          <Text fontSize={24} fontWeight={500} py={4}>
            {defaultValue ? "Update Payment" : "Record New Payment"}
          </Text>
        </HStack>
      </Flex>

      <CustomerDetailsComponent
        defaultValue={defaultValue}
        customerList={customerList}
        customerId={customerId}
        handleFieldChange={handleFieldChange}
        billingAddress={billingAddress}
        shippingAddress={shippingAddress}
        isHide={true}
      />

      <Flex ml={{ base: 2, sm: 2, md: "23%", lg: "23%" }}>
        {customerId && <CustomerDetailsDrawer customerData={customerData} />}
      </Flex>

      <hr style={{ marginTop: "20px", marginBottom: "20px" }} />

      <Stack spacing={4}>
        <Stack
          alignItems={"center"}
          spacing={6}
          direction={{ base: "column", md: "row" }}
        >
          <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
            Amount Received<span style={{ color: "red" }}>*</span>
          </Text>
          <InputGroup w={{ base: "100%", sm: "100%", md: "40%" }}>
            <InputLeftAddon>{organizationData?.baseCurrency}</InputLeftAddon>
            <Input
              borderRadius={"6px"}
              name="amount"
              type="number"
              value={amount}
              onChange={handleFieldChange}
              borderLeft={0}
            />
          </InputGroup>
        </Stack>

        <Checkbox
          w={{ base: "100%", md: "25%", lg: "17%" }}
          ml={{ base: 2, sm: 2, md: "23%", lg: "23%" }}
          size={"sm"}
        >
          Received full amount
        </Checkbox>

        {/* Bank Charges */}
        <Stack
          alignItems={"center"}
          spacing={6}
          direction={{ base: "column", md: "row" }}
        >
          <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
            Bank Charges (if any)
          </Text>
          <Input
            name="bankCharges"
            value={bankCharges}
            type="number"
            w={{ base: "100%", sm: "100%", md: "40%" }}
            borderRadius={"6px"}
            onChange={handleFieldChange}
          />
        </Stack>

        {/* Payment date */}

        <Stack
          alignItems={"center"}
          spacing={6}
          direction={{ base: "column", md: "row" }}
        >
          <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
            Payment Date<span style={{ color: "red" }}>*</span>
          </Text>
          <VStack w={{ base: "100%", sm: "100%", md: "40%" }} align={"left"}>
            <Input
              value={paymentDate}
              w={"100%"}
              type="date"
              borderRadius={"6px"}
              name="paymentDate"
              onChange={handleFieldChange}
            />
          </VStack>
        </Stack>

        {/* Payment Mode */}
        <Stack
          alignItems={"center"}
          spacing={6}
          direction={{ base: "column", md: "row" }}
        >
          <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
            Payment Mode
          </Text>
          <Select
            w={{ base: "100%", sm: "100%", md: "40%" }}
            borderRadius={"6px"}
            value={paymentMode}
            name="paymentMode"
            onChange={handleFieldChange}
          >
            <option value="Bank Remittance">Bank Remittance</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
            <option value="Check">Check</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Stripe">Stripe</option>
          </Select>
        </Stack>

        {/* reference */}
        <Stack
          alignItems={"center"}
          spacing={6}
          direction={{ base: "column", md: "row" }}
        >
          <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
            Reference#
          </Text>
          <Input
            name="reference"
            value={reference}
            w={{ base: "100%", sm: "100%", md: "40%" }}
            borderRadius={"6px"}
            onChange={handleFieldChange}
          />
        </Stack>

        {/* Tax deduction */}

        <Stack spacing={6} direction={{ base: "column", md: "row" }}>
          <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
            Tax deducted ?
          </Text>
          <RadioGroup
            onChange={(value) => handleFieldChange(value)}
            name="taxDeduction"
            display={"flex"}
            columnGap={4}
          >
            <Radio value="No">No Tax deducted</Radio>
            <Radio value="Yes">Yes, TDS (Income tax)</Radio>
          </RadioGroup>
        </Stack>
      </Stack>

      <UnpaidInvoicesTable />
    </Stack>
  );
};

export { PaymentInputForm };
