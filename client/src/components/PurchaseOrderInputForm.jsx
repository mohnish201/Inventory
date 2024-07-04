import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  VStack,
  Select as ChakraSelect,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Textarea,
  FormHelperText,
} from "@chakra-ui/react";
import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import ReactSelect from "react-select";
import { getItems } from "../actions/item.action";
import { getVendors } from "../actions/vendor.action";
import { getWarehouses } from "../actions/warehouse.action";
import { Loading } from "./Loading";
import { Link } from "react-router-dom";
import {
  addPurchaseOrder,
  updatePurchaseOrder,
} from "../actions/purchaseOrder.action";
import toast from "react-hot-toast";
import VendorDetailsComponent from "./VendorDetailsComponent";
import WarehouseDetailsComponent from "./WarehouseDetailsComponent";
import NotesAndTermsComponent from "./NotesAndTermsComponent";
import PDFDrawer from "./PDFDrawer";
import { ReactToHTML } from "../constants/reactTohtml";
import { generateInvoicePDF } from "../actions/invoice.action";
import PdfTemplate from "./PdfTemplate";
import { OrganizationContextProvider } from "../providers/ContextProvider";
import { useCurrencyFormat } from "../hooks/useCurrrencyFormat";

const initState = {
  warehouseId: "",
  vendorId: "",
  reference: "",
  purchaseOrderNo: "",
  purchaseOrderDate: "",
  expectedDeliveryDate: "",
  paymentTerms: "",
  deliveryMethod: "",
  customerNote: "",
  termsAndCondition: "",
  subTotal: 0,
  itemDetails: [],
  discount: 0,
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

    case "UPDATE_PURCHASE_ORDER_NUMBER":
      return { ...state, purchaseOrderNo: `SO-${action.payload}` };

    case "UPDATE_SUB_TOTAL":
      return { ...state, subTotal: action.subTotal };

    case "UPDATE_ITEM_DETAILS":
      return { ...state, itemDetails: action.itemDetails };

    case "UPDATE_TOTAL":
      return {
        ...state,
        total: +state.subTotal - +state.discount,
      };

    case "RESET":
      return initState;

    default:
      return state;
  }
};

const PurchaseOrderInputForm = ({ defaultValue }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [vendorList, setVendorList] = useState([]);
  const [itemData, setItemData] = useState({});
  const [itemsList, setItemsList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [vendorBillingAddress, setVendorBillingAddress] = useState({});
  const [vendorShippingAddress, setVendorShippingAddress] = useState({});
  const [warehouseAddress, setWareHouseAddress] = useState({});
  const [pdfUrl, setPdfUrl] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { organizationData } = useContext(OrganizationContextProvider);

  const { formatCurrency } = useCurrencyFormat();

  const {
    warehouseId,
    vendorId,
    reference,
    purchaseOrderNo,
    purchaseOrderDate,
    expectedDeliveryDate,
    paymentTerms,
    deliveryMethod,
    customerNote,
    termsAndCondition,
    subTotal,
    itemDetails,
    discount,
    total,
  } = state;

  const itemsOptions = itemsList.map((item) => ({
    value: item._id,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={item?.itemsImage[0]}
          alt={item?.name}
          style={{
            width: 40,
            height: 40,
            marginRight: 10,
            borderRadius: "50%",
            objectFit: "contain",
          }}
        />
        <div>
          <div style={{ fontWeight: 600, fontSize: "14px" }}>{item?.name}</div>
          <div style={{ fontSize: "10px" }}>
            <span style={{ fontWeight: 500 }}>SKU: </span>
            {item?.SKU}
          </div>
        </div>
      </div>
    ),
    name: item?.name,
    itemImage: item?.itemsImage[0],
    SKU: item?.SKU,
    currentStock: item?.currentStock,
    sellingPrice: item?.salesInformation?.sellingPrice,
  }));

  const handleFieldChange = (e) => {
    if (!e.target && e.name == "vendorId") {
      const { name, value } = e;
      setVendorBillingAddress(e.billingAddress);
      setVendorShippingAddress(e.shippingAddress);
      dispatch({ type: "UPDATE_FIELD", name, value });
    } else if (!e.target && e.name == "warehouseId") {
      const { name, value } = e;
      setWareHouseAddress(e.address);
      dispatch({ type: "UPDATE_FIELD", name, value });
    } else {
      const { name, value } = e.target;
      dispatch({ type: "UPDATE_FIELD", name, value });
    }
  };

  const addNewRow = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const quantity = parseFloat(formData.get("quantity"));
    const rate = parseFloat(formData.get("rate"));

    const amount = quantity * rate;

    delete itemData.label;

    const newData = { ...itemData };
    formData.forEach((value, key) => {
      newData[key] = value;
    });
    newData.amount = amount;

    dispatch({ type: "ADD_TABLE_ROW", row: newData });

    onClose();
  };

  const handleSubmit = async () => {
    dispatch({ type: "SAVE_FORM_DATA", payload: state });
    console.log(state);
    setLoading(true);
    try {
      await addPurchaseOrder(state);
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
          address={warehouseAddress}
          data={state}
          type={"purchaseOrder"}
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

  const handleUpdate = async () => {
    setLoading(true);

    try {
      dispatch({ type: "SAVE_FORM_DATA", payload: state });
      await updatePurchaseOrder(state, defaultValue._id);
      toast.success("Success");
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (defaultValue) {
      dispatch({ type: "SAVE_FORM_DATA", payload: defaultValue });
      setVendorBillingAddress(defaultValue?.vendor?.billingAddress);
      setVendorShippingAddress(defaultValue?.vendor?.shippingAddress);
      setWareHouseAddress(defaultValue?.warehouse?.address);
    }
  }, []);

  useEffect(() => {
    let subTotal = itemDetails?.reduce((acc, curr) => {
      return acc + Number(curr.amount);
    }, 0);

    dispatch({ type: "UPDATE_SUB_TOTAL", subTotal });
    dispatch({
      type: "UPDATE_TOTAL",
    });
  }, [itemDetails, total, discount]);

  useEffect(() => {
    const load = async () => {
      setFetching(true);
      try {
        let warehouses = await getWarehouses();
        let items = await getItems();
        let vendors = await getVendors();
        setWarehouseList(warehouses.data);
        setItemsList(items.data);
        setVendorList(vendors.data);
      } catch (error) {
        console.log(error);
      }
      setFetching(false);
    };

    load();
  }, []);

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
          <FiShoppingCart fontSize={24} />
          <Text fontSize={24} fontWeight={500} py={4}>
            {defaultValue ? "Update Purchase Order" : "New Purchase Order"}
          </Text>
        </HStack>

        {defaultValue && (
          <PDFDrawer
            pdfUrl={pdfUrl}
            isLoading={pdfLoading}
            handleGeneratePdf={handleGenerateInvoicePdf}
          >
            Print Purchase Order
          </PDFDrawer>
        )}
      </Flex>

      {/* Vendor Select Component */}

      <VendorDetailsComponent
        defaultValue={defaultValue}
        vendorList={vendorList}
        vendorId={vendorId}
        handleFieldChange={handleFieldChange}
        billingAddress={vendorBillingAddress}
        shippingAddress={vendorShippingAddress}
      />

      {/* Delivery Address */}
      <WarehouseDetailsComponent
        defaultValue={defaultValue}
        warehouseId={warehouseId}
        warehouseList={warehouseList}
        handleFieldChange={handleFieldChange}
        warehouseAddress={warehouseAddress}
      />

      <hr style={{ marginTop: "20px", marginBottom: "20px" }} />

      <VStack spacing={4} align={"left"}>
        {/* Purchase Order */}
        <Stack
          alignItems={"center"}
          spacing={6}
          direction={{ base: "column", md: "row" }}
        >
          <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
            Purchase Order<span style={{ color: "red" }}>*</span>
          </Text>
          <InputGroup w={{ base: "100%", sm: "100%", md: "40%" }}>
            <InputLeftAddon pr={0} bg={"white"}>
              PO-
            </InputLeftAddon>
            <Input
              borderRadius={"6px"}
              placeholder="0000"
              name="purchaseOrderNo"
              value={purchaseOrderNo}
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

        {/* purchase order date */}
        <Stack spacing={6} direction={{ base: "column", md: "row" }}>
          <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
            Sales Order Date<span style={{ color: "red" }}>*</span>
          </Text>
          <VStack w={{ base: "100%", sm: "100%", md: "40%" }} align={"left"}>
            <Input
              w={"100%"}
              type="date"
              value={purchaseOrderDate}
              borderRadius={"6px"}
              name="purchaseOrderDate"
              onChange={handleFieldChange}
            />
          </VStack>
        </Stack>

        {/* Expected Delivery date */}
        <Stack spacing={6} direction={{ base: "column", md: "row" }}>
          <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
            Expected Delivery Date <span style={{ color: "red" }}>*</span>
          </Text>

          <Input
            w={{ base: "100%", sm: "100%", md: "40%" }}
            type="date"
            name="expectedDeliveryDate"
            value={expectedDeliveryDate}
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
          <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
            Payment Terms
          </Text>
          <ChakraSelect
            w={{ base: "100%", sm: "100%", md: "40%" }}
            borderRadius={"6px"}
            name="paymentTerms"
            value={paymentTerms}
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

        {/* Delivery Method */}
        <VStack align={"left"}>
          <Stack
            alignItems={"center"}
            spacing={6}
            direction={{ base: "column", md: "row" }}
          >
            <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
              Delivery Method
            </Text>
            <ChakraSelect
              value={deliveryMethod}
              name="deliveryMethod"
              w={{ base: "100%", sm: "100%", md: "40%" }}
              borderRadius={"6px"}
              placeholder="Select a delivery method"
              onChange={handleFieldChange}
            >
              <option value="airline">Airline</option>
            </ChakraSelect>
          </Stack>
        </VStack>
        <hr style={{ marginTop: "20px", marginBottom: "40px" }} />

        {/* Table */}
        <Flex mb={10} justifyContent={"flex-end"}>
          <Button onClick={onOpen} size={"sm"} leftIcon={<IoIosAddCircle />}>
            Add New
          </Button>
        </Flex>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th textAlign={"center"} w={"md"}>
                  ITEM DETAILS
                </Th>
                <Th textAlign={"center"} isNumeric>
                  ACCOUNT
                </Th>
                <Th textAlign={"center"} isNumeric>
                  QUANTITY
                </Th>
                <Th textAlign={"center"} isNumeric>
                  RATE
                </Th>
                <Th textAlign={"center"} isNumeric>
                  AMOUNT
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {itemDetails.map((el) => (
                <Tr key={el?._id}>
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
                  <Td textAlign={"center"}>{el?.account}</Td>
                  <Td textAlign={"center"}> {el?.quantity}</Td>
                  <Td textAlign={"center"}>{formatCurrency(el?.rate)}</Td>
                  <Td textAlign={"center"}>{formatCurrency(el?.amount)}</Td>
                  <Td textAlign={"center"}>
                    <TiDelete
                      cursor={"pointer"}
                      fontSize={"25px"}
                      color="red"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>

        {itemDetails.length === 0 && (
          <Text
            p={4}
            w={"100%"}
            textTransform={"uppercase"}
            textAlign={"center"}
          >
            No Item Added
          </Text>
        )}

        {/* Add new Modal */}

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          closeOnEsc={true}
          isCentered={true}
        >
          <ModalOverlay />
          <form onSubmit={addNewRow}>
            <ModalContent>
              <ModalHeader>Add New Item</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Item Details</FormLabel>

                  {/* React Select */}
                  <ReactSelect
                    name="itemId"
                    required
                    placeholder="Select an Item"
                    options={itemsOptions}
                    onChange={(e) => setItemData(e)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Select Account</FormLabel>

                  <ChakraSelect
                    name="account"
                    required
                    placeholder="Select an Account"
                  >
                    <option value="Inventory Assets">Inventory Assets</option>
                  </ChakraSelect>
                </FormControl>

                <HStack>
                  <FormControl mt={4}>
                    <FormLabel>Rate</FormLabel>
                    <Input
                      name="rate"
                      required
                      type="number"
                      step="any"
                      placeholder="0.00"
                      value={itemData?.sellingPrice}
                    />
                  </FormControl>
                </HStack>
                <FormControl mt={4}>
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    name="quantity"
                    required
                    type="number"
                    defaultValue={1}
                    max={`${itemData.currentStock}`}
                    placeholder="Add Quantity"
                  />
                  <FormHelperText
                    textAlign={"right"}
                    fontSize={"xs"}
                    color={"blue"}
                  >
                    Quantity must be less or equal to &nbsp;
                    {itemData.currentStock || 0}
                  </FormHelperText>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button w={100} type="submit" colorScheme="blue" mr={3}>
                  Add
                </Button>
                <Button w={100} variant={"outline"} onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>

        <Flex
          direction={{ base: "column-reverse", md: "row" }}
          mt={10}
          mb={10}
          justifyContent={"space-between"}
          columnGap={4}
          rowGap={4}
        >
          {/* Customer Notes and Term&Condition */}
          <NotesAndTermsComponent
            customerNote={customerNote}
            termsAndCondition={termsAndCondition}
            handleFieldChange={handleFieldChange}
          />

          {/* subtotal */}
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
                  <Td display={"flex"} columnGap={8} alignItems={"center"}>
                    <Text fontSize={"sm"}>Discount</Text>
                    <Input
                      name="discount"
                      placeholder="0.00"
                      borderRadius={"6px"}
                      size={"sm"}
                      type="number"
                      value={discount}
                      onChange={handleFieldChange}
                    />
                  </Td>
                  <Td>{formatCurrency(discount)}</Td>
                </Tr>

                <Tfoot>
                  <Td fontWeight={600}>Total(Rs)</Td>
                  <Td fontWeight={600}>{formatCurrency(total)}</Td>
                </Tfoot>
              </Table>
            </TableContainer>
          </VStack>
        </Flex>
      </VStack>

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
          onClick={defaultValue ? handleUpdate : handleSubmit}
        >
          {defaultValue ? "Update" : "Save"}
        </Button>
        {defaultValue ? (
          <Link to={"/purchase/orders"}>
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

export { PurchaseOrderInputForm };
