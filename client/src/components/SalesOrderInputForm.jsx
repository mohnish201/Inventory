import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select as ChakraSelect,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
  FormHelperText,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/react";
import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { IoIosAddCircle } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { getCustomers } from "../actions/customer.action";
import {
  addSalesOrder,
  deleteSalesOrderItemById,
  generateSalesOrderPDF,
  updateSalesOrder,
} from "../actions/salesOrder.action";
import { getItems } from "../actions/item.action";
import Select from "react-select";
import toast from "react-hot-toast";
import { Loading } from "./Loading";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import CustomerDetailsComponent from "./CustomerDetailsComponent";
import ItemTableComponent from "./ItemTableComponent";
import NewItemModalComponent from "./NewItemModalComponent ";
import NotesAndTermsComponent from "./NotesAndTermsComponent";
import InvoiceSummaryComponent from "./InvoiceSummaryComponent";
import PDFDrawer from "./PDFDrawer";
import { ReactToHTML } from "../constants/reactTohtml";
import PdfTemplate from "./PdfTemplate";
import { OrganizationContextProvider } from "../providers/ContextProvider";
import { useCurrencyFormat } from "../hooks/useCurrrencyFormat";
const initState = {
  customerId: "",
  reference: "",
  salesOrderNo: "",
  salesOrderDate: "",
  expectedShipmentDate: "",
  paymentTerms: "",
  deliveryMethod: "",
  salesPerson: "",
  customerNote: "",
  termsAndCondition: "",
  subTotal: 0,
  itemDetails: [],
  shippingCharges: 0,
  otherCharges: 0,
  total: 0,
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

const SalesOrderInputForm = ({ defaultValue }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [customerList, setCustomerList] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [itemData, setItemData] = useState({});
  const [isFetching, setFetching] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [billingAddress, setBillingAddress] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [pdfUrl, setPdfUrl] = useState(null);
  const { organizationData } = useContext(OrganizationContextProvider);

  const {
    customerId,
    reference,
    salesOrderNo,
    salesOrderDate,
    expectedShipmentDate,
    paymentTerms,
    deliveryMethod,
    salesPerson,
    customerNote,
    termsAndCondition,
    subTotal,
    itemDetails,
    shippingCharges,
    otherCharges,
    total,
  } = state;

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef(null);

  const formatCurrency = useCurrencyFormat();

  // Function to handle changes in input fields
  const handleFieldChange = (e) => {
    if (!e.target) {
      const { name, value } = e;
      setShippingAddress(e.shippingAddress);
      setBillingAddress(e.billingAddress);
      dispatch({ type: "UPDATE_FIELD", name, value });
    } else {
      const { name, value } = e.target;
      dispatch({ type: "UPDATE_FIELD", name, value });
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    dispatch({ type: "SAVE_FORM_DATA", payload: state });

    setLoading(true);
    try {
      await addSalesOrder(state);
      toast.success("Success");
      dispatch({ type: "RESET" });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleGenerateSalesOrderPdf = async () => {
    setPdfLoading(true);
    try {
      const html = ReactToHTML(
        <PdfTemplate
          billingAddress={billingAddress}
          shippingAddress={shippingAddress}
          data={state}
          type={"salesOrder"}
          formatCurrency={formatCurrency}
        />
      );
      const res = await generateSalesOrderPDF(html);
      setPdfUrl(res);
    } catch (error) {
      toast.error(error.message);
    }
    setPdfLoading(false);
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      dispatch({ type: "SAVE_FORM_DATA", payload: state });
      await updateSalesOrder(state, defaultValue._id);
      toast.success("Success");
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  // Function to add a new row to the table
  const addNewRow = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const quantity = formData.get("quantity");
    const rate = formData.get("rate");
    const discountPercent = formData.get("discountPercent");

    let amount = quantity * rate;
    const discountAmount = (amount * discountPercent) / 100;
    amount = amount - discountAmount;

    delete itemData.label;

    const newData = {
      ...itemData,
      quantity,
      rate,
      discountPercent: discountAmount * quantity,
      amount,
    };
    formData.forEach((value, key) => {
      newData[key] = value;
    });

    dispatch({ type: "ADD_TABLE_ROW", row: newData });

    onModalClose();
  };

  const handleDeleteItem = async (item) => {
    let itemSet = new Set(itemDetails);
    itemSet.delete(item);
    dispatch({
      type: "UPDATE_ITEM_DETAILS",
      itemDetails: Array.from(itemSet),
    });
  };

  useEffect(() => {
    const load = async () => {
      setFetching(true);
      try {
        let customers = await getCustomers();
        let items = await getItems();
        setCustomerList(customers.data);
        setItemsList(items.data);
      } catch (error) {
        console.log(error);
      }

      setFetching(false);
    };

    load();
  }, []);

  useEffect(() => {
    if (defaultValue) {
      dispatch({ type: "SAVE_FORM_DATA", payload: defaultValue });
      setBillingAddress(defaultValue?.customer?.billingAddress);
      setShippingAddress(defaultValue?.customer?.shippingAddress);
    }
  }, []);

  useEffect(() => {
    let subTotal = itemDetails.reduce((acc, curr) => {
      return acc + Number(curr.amount);
    }, 0);

    dispatch({ type: "UPDATE_SUB_TOTAL", subTotal });
    dispatch({
      type: "UPDATE_TOTAL",
    });
  }, [itemDetails, total, shippingCharges, otherCharges]);

  if (isFetching) return <Loading />;

  return (
    <Stack>
      <Stack pb={10} px={4} overflow={"auto"}>
        {/* Header */}
        <Flex
          direction={{ base: "column", sm: "row" }}
          justifyContent={"space-between"}
          alignItems={{ base: "flex-start", sm: "center" }}
        >
          <HStack>
            <FiShoppingCart fontSize={24} />
            <Text fontSize={24} fontWeight={500} py={4}>
              {defaultValue ? "Update Sales Order" : "New Sales Order"}
            </Text>
          </HStack>
          {defaultValue && (
            <PDFDrawer
              pdfUrl={pdfUrl}
              isLoading={pdfLoading}
              handleGeneratePdf={handleGenerateSalesOrderPdf}
            >
              Print Sales Order
            </PDFDrawer>
          )}
        </Flex>
        <form>
          {/* Customer name */}
          <CustomerDetailsComponent
            defaultValue={defaultValue}
            customerList={customerList}
            customerId={customerId}
            handleFieldChange={handleFieldChange}
            billingAddress={billingAddress}
            shippingAddress={shippingAddress}
          />

          <hr style={{ marginTop: "20px", marginBottom: "20px" }} />
          {/*  */}
          <VStack spacing={4} align={"left"}>
            {/* Sales order */}
            <Stack
              alignItems={"center"}
              spacing={6}
              direction={{ base: "column", md: "row" }}
            >
              <Text
                fontWeight={500}
                w={{ base: "100%", sm: "100%", md: "20%" }}
              >
                Sales Order<span style={{ color: "red" }}>*</span>
              </Text>
              <InputGroup w={{ base: "100%", sm: "100%", md: "40%" }}>
                <InputLeftAddon pr={0} bg={"white"}>
                  SO-
                </InputLeftAddon>
                <Input
                  borderRadius={"6px"}
                  placeholder="0000"
                  name="salesOrderNo"
                  value={salesOrderNo}
                  onChange={handleFieldChange}
                  borderLeft={0}
                  pl={0}
                />
              </InputGroup>
            </Stack>

            {/* reference */}
            <Stack
              alignItems={"center"}
              spacing={6}
              direction={{ base: "column", md: "row" }}
            >
              <Text
                fontWeight={500}
                w={{ base: "100%", sm: "100%", md: "20%" }}
              >
                Reference
              </Text>
              <Input
                name="reference"
                value={reference}
                w={{ base: "100%", sm: "100%", md: "40%" }}
                borderRadius={"6px"}
                onChange={handleFieldChange}
              />
            </Stack>

            {/* Sales Order Date */}

            <Stack spacing={6} direction={{ base: "column", md: "row" }}>
              <Text
                fontWeight={500}
                w={{ base: "100%", sm: "100%", md: "20%" }}
              >
                Sales Order Date<span style={{ color: "red" }}>*</span>
              </Text>
              <VStack
                w={{ base: "100%", sm: "100%", md: "40%" }}
                align={"left"}
              >
                <Input
                  value={salesOrderDate}
                  w={"100%"}
                  type="date"
                  borderRadius={"6px"}
                  name="salesOrderDate"
                  onChange={handleFieldChange}
                />
              </VStack>
            </Stack>

            {/* Expected Shipment date */}

            <Stack spacing={6} direction={{ base: "column", md: "row" }}>
              <Text
                fontWeight={500}
                w={{ base: "100%", sm: "100%", md: "20%" }}
              >
                Expected Shipment Date <span style={{ color: "red" }}>*</span>
              </Text>

              <Input
                value={expectedShipmentDate}
                w={{ base: "100%", sm: "100%", md: "40%" }}
                type="date"
                name="expectedShipmentDate"
                borderRadius={"6px"}
                onChange={handleFieldChange}
              />
            </Stack>

            {/* Payment Terms */}
            <Stack
              alignItems={"center"}
              spacing={6}
              direction={{ base: "column", md: "row" }}
            >
              <Text
                fontWeight={500}
                w={{ base: "100%", sm: "100%", md: "20%" }}
              >
                Payment Terms
              </Text>
              <ChakraSelect
                w={{ base: "100%", sm: "100%", md: "40%" }}
                borderRadius={"6px"}
                value={paymentTerms}
                name="paymentTerms"
                onChange={handleFieldChange}
              >
                <option value="Net 15">Net 15</option>
                <option value="Net 30">Net 30</option>
                <option value="Net 45">Net 45</option>
                <option value="Net 60">Net 60</option>
                <option value="Due end of the month">
                  Due end of the month
                </option>
                <option value="Due end the next month">
                  Due end of the next month
                </option>
                <option value="Due on Receipt">Due on Receipt</option>
              </ChakraSelect>
            </Stack>
          </VStack>
          <hr style={{ marginTop: "20px", marginBottom: "20px" }} />
          {/* Delivery Method */}
          <VStack align={"left"}>
            <Stack
              alignItems={"center"}
              spacing={6}
              direction={{ base: "column", md: "row" }}
            >
              <Text
                fontWeight={500}
                w={{ base: "100%", sm: "100%", md: "20%" }}
              >
                Delivery Method
              </Text>
              <ChakraSelect
                name="deliveryMethod"
                value={deliveryMethod}
                w={{ base: "100%", sm: "100%", md: "40%" }}
                borderRadius={"6px"}
                placeholder="Select a delivery method or type to add"
                onChange={handleFieldChange}
              >
                <option value="airline">Airline</option>
              </ChakraSelect>
            </Stack>
            {/* Salesperson */}

            <Stack
              alignItems={"center"}
              spacing={6}
              direction={{ base: "column", md: "row" }}
            >
              <Text
                fontWeight={500}
                w={{ base: "100%", sm: "100%", md: "20%" }}
              >
                Salesperson
              </Text>
              <ChakraSelect
                value={salesPerson}
                w={{ base: "100%", sm: "100%", md: "40%" }}
                borderRadius={"6px"}
                placeholder="Select or Add Salesperson"
                name="salesPerson"
                onChange={handleFieldChange}
              >
                <option value="Arun">Arun</option>
                <option value="Mohnish">Mohnish</option>
              </ChakraSelect>
            </Stack>
          </VStack>
          <hr style={{ marginTop: "20px", marginBottom: "40px" }} />
          <Flex mb={10} justifyContent={"flex-end"}>
            <Button
              onClick={onModalOpen}
              size={"sm"}
              leftIcon={<IoIosAddCircle />}
            >
              Add New
            </Button>
          </Flex>

          {/* Add new Model */}

          <NewItemModalComponent
            isOpen={isModalOpen}
            onOpen={onModalOpen}
            onClose={onModalClose}
            addNewRow={addNewRow}
            initialRef={initialRef}
            finalRef={finalRef}
            setItemData={setItemData}
            itemData={itemData}
            itemsList={itemsList}
          />

          {/* Table */}
          <ItemTableComponent
            itemDetails={itemDetails}
            handleDeleteItem={handleDeleteItem}
          />
        </form>

        <Flex
          direction={{ base: "column-reverse", md: "row" }}
          mt={10}
          mb={10}
          justifyContent={"space-between"}
          columnGap={4}
          rowGap={4}
        >
          {/* Customer Notes and Terms&Conditions  */}
          <NotesAndTermsComponent
            customerNote={customerNote}
            termsAndCondition={termsAndCondition}
            handleFieldChange={handleFieldChange}
          />

          {/* Invoice Summary */}
          <InvoiceSummaryComponent
            subTotal={subTotal}
            shippingCharges={shippingCharges}
            otherCharges={otherCharges}
            total={total}
            handleFieldChange={handleFieldChange}
          />
        </Flex>
      </Stack>
      <Flex
        borderTop={"1px solid"}
        borderColor={"inherit"}
        pos="fixed"
        bottom={0}
        bg={"#fff"}
        w={"full"}
        px={4}
        py={2}
        gap={6}
      >
        <Box>
          {defaultValue && (
            <Link to={`/sales/invoices/create?id=${defaultValue?._id}`}>
              <Button
                w={200}
                display={{ base: "none", sm: "flex" }}
                alignItems={"center"}
                columnGap={1}
                bgColor={"gray.200"}
                color={"black"}
                _hover={{ bgColor: "gray.300", color: "black" }}
              >
                <LiaFileInvoiceSolid fontSize={"20px"} />
                Create Invoice
              </Button>
            </Link>
          )}

          <Link>
            <Button
              bgColor={"gray.200"}
              color={"black"}
              _hover={{ bgColor: "gray.300", color: "black" }}
              display={{ base: "inline-block", sm: "none" }}
            >
              <LiaFileInvoiceSolid fontSize={"20px"} />
            </Button>
          </Link>
        </Box>

        <Button
          w={150}
          isLoading={isLoading}
          onClick={defaultValue ? handleUpdate : handleSubmit}
        >
          {defaultValue ? "Update" : "Save"}
        </Button>
        {defaultValue ? (
          <Link to={"/sales/orders"}>
            <Button w={150} colorScheme="gray" variant={"outline"}>
              Cancel
            </Button>
          </Link>
        ) : (
          <Button
            w={150}
            onClick={() => dispatch({ type: "RESET" })}
            colorScheme="gray"
            variant={"outline"}
          >
            Reset
          </Button>
        )}
      </Flex>
    </Stack>
  );
};

export { SalesOrderInputForm };
