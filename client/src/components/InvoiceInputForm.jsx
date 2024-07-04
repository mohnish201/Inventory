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
  addInvoice,
  generateInvoicePDF,
  updateInvoice,
} from "../actions/invoice.action";
import { getItems } from "../actions/item.action";
import Select from "react-select";
import toast from "react-hot-toast";
import { Loading } from "./Loading";
import { TbFileInvoice } from "react-icons/tb";
import { Link } from "react-router-dom";
import CustomerDetailsComponent from "./CustomerDetailsComponent";
import ItemTableComponent from "./ItemTableComponent";
import NewItemModalComponent from "./NewItemModalComponent ";
import NotesAndTermsComponent from "./NotesAndTermsComponent";
import InvoiceSummaryComponent from "./InvoiceSummaryComponent";
import PDFDrawer from "./PDFDrawer";
import PdfTemplate from "./PdfTemplate";
import { ReactToHTML } from "../constants/reactTohtml";
import { OrganizationContextProvider } from "../providers/ContextProvider";
import { useCurrencyFormat } from "../hooks/useCurrrencyFormat";
const initState = {
  customerId: "",
  reference: "",
  invoiceNo: "",
  invoiceDate: "",
  paymentTerms: "",
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

    case "UPDATE_INVOICE_NUMBER":
      return { ...state, invoiceNo: `SO-${action.payload}` };

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

const InvoiceInputForm = ({ defaultValue, salesOrderValue }) => {
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
    invoiceNo,
    invoiceDate,
    paymentTerms,
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

  const { formatCurrency } = useCurrencyFormat();

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
      await addInvoice(state);

      toast.success("Success");
      dispatch({ type: "RESET" });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleGenerateInvoicePdf = async () => {
    setPdfLoading(true);
    try {
      const html = ReactToHTML(
        <PdfTemplate
          billingAddress={billingAddress}
          shippingAddress={shippingAddress}
          data={state}
          type={"invoice"}
          formatCurrency={formatCurrency}
        />
      );
      const res = await generateInvoicePDF(html);
      setPdfUrl(res);
    } catch (error) {
      toast.error(error.message);
    }
    setPdfLoading(false);
  };

  const sendEmail = () => {
    console.log(organizationData);
  };

  const handleUpdate = async () => {
    setLoading(true);

    try {
      dispatch({ type: "SAVE_FORM_DATA", payload: state });
      await updateInvoice(state, defaultValue._id);
      toast.success("Success");
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  const createInvoiceFromSales = async () => {
    setLoading(true);
    try {
      delete state._id;

      dispatch({ type: "SAVE_FORM_DATA", payload: state });
      await addInvoice(state);
      toast.success("Success");
      dispatch({ type: "RESET" });
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  // Function to add a new row to the table
  const addNewRow = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const quantity = parseFloat(formData.get("quantity"));
    const rate = parseFloat(formData.get("rate"));
    const discountPercent = parseFloat(formData.get("discountPercent"));

    const discountAmount = (rate * +discountPercent) / 100;

    const amount = quantity * rate - discountAmount;

    delete itemData.label;

    const newData = {
      ...itemData,
      quantity,
      rate,
      discountPercent: discountAmount,
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

    if (salesOrderValue) {
      dispatch({ type: "SAVE_FORM_DATA", payload: salesOrderValue });
      setBillingAddress(salesOrderValue?.customer?.billingAddress);
      setShippingAddress(salesOrderValue?.customer?.shippingAddress);
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
    <Stack px={4} mb={10} overflow={"auto"}>
      {/* Header */}
      <Flex
        direction={{ base: "column", sm: "row" }}
        justifyContent={"space-between"}
        alignItems={{ base: "flex-start", sm: "center" }}
      >
        <HStack>
          <TbFileInvoice fontSize={24} />
          <Text fontSize={24} fontWeight={500} py={4}>
            {defaultValue ? "Update Invoice" : "Create New Invoice"}
          </Text>
        </HStack>
        {defaultValue && (
          <PDFDrawer
            pdfUrl={pdfUrl}
            sendEmail={sendEmail}
            isLoading={pdfLoading}
            handleGeneratePdf={handleGenerateInvoicePdf}
          >
            Print Invoice
          </PDFDrawer>
        )}
      </Flex>
      <form>
        <CustomerDetailsComponent
          defaultValue={defaultValue}
          salesOrderValue={salesOrderValue}
          customerList={customerList}
          customerId={customerId}
          handleFieldChange={handleFieldChange}
          billingAddress={billingAddress}
          shippingAddress={shippingAddress}
        />
        <hr style={{ marginTop: "20px", marginBottom: "20px" }} />
        {/*  */}
        <VStack spacing={4} align={"left"}>
          {/* invoice no */}
          <Stack
            alignItems={"center"}
            spacing={6}
            direction={{ base: "column", md: "row" }}
          >
            <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
              Invoice<span style={{ color: "red" }}>*</span>
            </Text>
            <InputGroup w={{ base: "100%", sm: "100%", md: "40%" }}>
              <InputLeftAddon pr={0} bg={"white"}>
                INV-
              </InputLeftAddon>
              <Input
                borderRadius={"6px"}
                placeholder="0000"
                name="invoiceNo"
                value={invoiceNo}
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
            <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
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

          <Stack
            alignItems={"center"}
            spacing={6}
            direction={{ base: "column", md: "row" }}
          >
            <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
              Invoice Date<span style={{ color: "red" }}>*</span>
            </Text>
            <VStack w={{ base: "100%", sm: "100%", md: "40%" }} align={"left"}>
              <Input
                value={invoiceDate}
                w={"100%"}
                type="date"
                borderRadius={"6px"}
                name="invoiceDate"
                onChange={handleFieldChange}
              />
            </VStack>
          </Stack>

          {/* Payment Terms */}
          <Stack
            alignItems={"center"}
            spacing={6}
            direction={{ base: "column", md: "row" }}
          >
            <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
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
              <option value="Due end of the month">Due end of the month</option>
              <option value="Due end the next month">
                Due end of the next month
              </option>
              <option value="Due on Receipt">Due on Receipt</option>
            </ChakraSelect>
          </Stack>

          {/* Salesperson */}

          <Stack
            alignItems={"center"}
            spacing={6}
            direction={{ base: "column", md: "row" }}
          >
            <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
              Salesperson
            </Text>
            <ChakraSelect
              value={salesPerson}
              w={{ base: "100%", sm: "100%", md: "40%" }}
              borderRadius={"6px"}
              placeholder="Select Salesperson"
              name="salesPerson"
              onChange={handleFieldChange}
            >
              <option value="Arun">Arun</option>
              <option value="Mohnish">Mohnish</option>
            </ChakraSelect>
          </Stack>
        </VStack>

        <hr style={{ marginTop: "20px", marginBottom: "40px" }} />

        {/* Table */}
        <Flex mb={10} justifyContent={"flex-end"}>
          <Button
            onClick={onModalOpen}
            size={"sm"}
            leftIcon={<IoIosAddCircle />}
          >
            Add New
          </Button>
        </Flex>

        {/* Add new Modal */}
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
        <Button
          w={150}
          isLoading={isLoading}
          onClick={
            salesOrderValue
              ? createInvoiceFromSales
              : defaultValue
              ? handleUpdate
              : handleSubmit
          }
        >
          {salesOrderValue ? "Create" : defaultValue ? "Update" : "Save"}
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

export { InvoiceInputForm };
