import {
  Input,
  Select,
  SimpleGrid,
  Stack,
  Button,
  Text,
  Flex,
  Textarea,
  Table,
  Th,
  Thead,
  Tr,
  TableContainer,
  Tbody,
  Td,
  Toast,
} from "@chakra-ui/react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllCurrency } from "../actions/currency.action";

import countries from "../constants/countries.json";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-hot-toast";

import { addVendor, updateVendor } from "../actions/vendor.action";

/* Schemaa */
const address = {
  street: "",
  city: "",
  state: "",
  zipCode: "",
  phone: "",
  country: "",
};

const VendorInputForm = ({ defaultValue, clear }) => {
  const [isLoading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState([]);

  /* Input States */
  const [salutation, setSalutation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  const [PAN, setPan] = useState("");
  const [GSTNo, setGSTNo] = useState("");
  const [currency, setCurrency] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [TDS, setTds] = useState("");
  const [remark, setRemark] = useState("");

  const [billingAddress, setBillingAddress] = useState(
    JSON.parse(JSON.stringify(address))
  );
  const [shippingAddress, setShippingAddress] = useState(
    JSON.parse(JSON.stringify(address))
  );

  const [bankDetails, setBankDetails] = useState(new Set());
  const [contactPerson, setContactPerson] = useState(new Set());

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        let { data } = await getAllCurrency();
        setCurrencies(data);
      } catch (_) {}

      setLoading(false);
    };

    load();
  }, []);

  const addPerson = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const newState = new Set(contactPerson);
    newState.add(data);
    setContactPerson(newState);
    e.target.reset();
  };

  const onRemovePerson = (data) => {
    const newState = new Set(contactPerson);
    newState.delete(data);
    setContactPerson(newState);
  };

  const addBank = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const newState = new Set(bankDetails);
    newState.add(data);
    setBankDetails(newState);
    e.target.reset();
  };

  const onRemoveBank = (data) => {
    const newState = new Set(bankDetails);
    newState.delete(data);
    setBankDetails(newState);
  };

  const getFormData = () => {
    const data = {
      salutation: salutation,
      firstName: firstName,
      lastName,
      companyName,
      displayName,
      email,
      mobileNo,
      PAN,
      GSTNo,
      currency,
      paymentTerms,
      TDS,
      remark,
      billingAddress,
      shippingAddress,
      contactPerson: Array.from(contactPerson),
      bankDetails: Array.from(bankDetails),
    };

    return data;
  };

  const isValid = (payload) => {
    for (const key in payload) {
      const value = payload[key];

      if (!value) return false;

      if (value instanceof Array && value.length === 0) {
        return false;
      }

      if (value instanceof Object) {
        for (const key in value) {
          if (!value[key]) {
            return false;
          }
        }
      }
    }

    return true;
  };

  const onPost = async () => {
    const payload = getFormData();
    const valid = isValid(payload);

    if (!valid) {
      toast.error("Fill all the fields");
      return;
    }

    setLoading(true);

    try {
      await addVendor(payload);
      clear();
      toast.success("Success");
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  const onUpdate = async () => {
    const payload = getFormData();
    const valid = isValid(payload);

    if (!valid) {
      toast.error("Fill all the fields");
      return;
    }

    setLoading(true);

    try {
      await updateVendor(payload, defaultValue._id);
      toast.success("Success");
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (defaultValue) {
      setSalutation(defaultValue.salutation);
      setFirstName(defaultValue.firstName);
      setLastName(defaultValue.lastName);
      setCompanyName(defaultValue.companyName);
      setDisplayName(defaultValue.displayName);
      setEmail(defaultValue.email);
      setMobileNo(defaultValue.mobileNo);
      setPan(defaultValue.PAN);
      setGSTNo(defaultValue.GSTNo);
      setTds(defaultValue.TDS);
      setPaymentTerms(defaultValue.paymentTerms);
      setCurrency(defaultValue.currency);
      setRemark(defaultValue.remark);
      setShippingAddress(defaultValue.shippingAddress);
      setBillingAddress(defaultValue.billingAddress);
      setContactPerson(new Set(defaultValue.contactPerson));
      setBankDetails(new Set(defaultValue.bankDetails));
    }
  }, []);

  return (
    <Stack pb={32}>
      <Stack spacing={4} p={4}>
        <Text fontSize={24} fontWeight={500}>
          {" "}
          {defaultValue ? "Update Vendor" : "New Vendor"}{" "}
        </Text>

        <SimpleGrid columns={[1, 1, 3, 4]} gap={2} mt={4}>
          <Select
            placeholder="Salutation"
            value={salutation}
            onChange={({ target }) => setSalutation(target.value)}
          >
            <option value="Mr"> Mr. </option>
            <option value="Mrs"> Mrs. </option>
            <option value="Ms"> Ms. </option>
            <option value="Miss"> Miss. </option>
            <option value="Prof"> Prof. </option>
            <option value="Dr"> Dr. </option>
          </Select>
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={({ target }) => setFirstName(target.value)}
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={({ target }) => setLastName(target.value)}
          />
          <Input
            placeholder="Company Name"
            value={companyName}
            onChange={({ target }) => setCompanyName(target.value)}
          />
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 3, 4]} gap={2}>
          <Input
            placeholder="Display Name"
            value={displayName}
            onChange={({ target }) => setDisplayName(target.value)}
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <Input
            type="number"
            placeholder="Mobile Number"
            value={mobileNo}
            onChange={({ target }) => setMobileNo(target.value)}
          />
        </SimpleGrid>

        <Tabs
          colorScheme="twitter"
          variant="enclosed"
          mt={4}
          userSelect={"none"}
        >
          <TabList flexWrap={"wrap"}>
            <Tab fontSize={14} fontWeight={500}>
              {" "}
              Other Details{" "}
            </Tab>
            <Tab fontSize={14} fontWeight={500}>
              {" "}
              Contact Persons{" "}
            </Tab>
            <Tab fontSize={14} fontWeight={500}>
              {" "}
              Bank Details{" "}
            </Tab>
            <Tab fontSize={14} fontWeight={500}>
              {" "}
              Address{" "}
            </Tab>
            <Tab fontSize={14} fontWeight={500}>
              {" "}
              Remark{" "}
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <SimpleGrid gap={2} columns={[1, 1, 2, 2]}>
                <Input
                  placeholder="PAN"
                  value={PAN}
                  onChange={({ target }) => setPan(target.value)}
                />
                <Input
                  placeholder="GST No."
                  value={GSTNo}
                  onChange={({ target }) => setGSTNo(target.value)}
                />
                <Input
                  placeholder="TDS"
                  value={TDS}
                  onChange={({ target }) => setTds(target.value)}
                />
                <Input
                  placeholder="Payment Terms"
                  value={paymentTerms}
                  onChange={({ target }) => setPaymentTerms(target.value)}
                />
                <Select
                  placeholder="Select Currency Code"
                  value={currency}
                  onChange={({ target }) => setCurrency(target.value)}
                >
                  {currencies?.map(({ _id, currencyName, currencySymbol }) => (
                    <option value={_id} key={_id}>
                      {" "}
                      {currencyName} ({currencySymbol}){" "}
                    </option>
                  ))}
                </Select>
              </SimpleGrid>
            </TabPanel>
            <form onSubmit={addPerson}>
              <TabPanel>
                <TableContainer
                  border={"1px solid #f2f2f2"}
                  minH={20}
                  rounded={6}
                >
                  <Table size={"sm"}>
                    <Thead>
                      <Tr>
                        <Th fontSize={10}> Salutation </Th>
                        <Th fontSize={10}> First Name </Th>
                        <Th fontSize={10}> Last Name </Th>
                        <Th fontSize={10}> Email </Th>
                        <Th> Mobile Number </Th>
                        <Th> </Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {Array.from(contactPerson).map((elm, index) => (
                        <Tr key={elm.firstName + index}>
                          <Td> {elm.salutation} </Td>
                          <Td> {elm.firstName} </Td>
                          <Td> {elm.lastName} </Td>
                          <Td> {elm.email} </Td>
                          <Td> {elm.mobileNo} </Td>
                          <Td>
                            <MdDeleteForever
                              onClick={() => onRemovePerson(elm)}
                              fontSize={20}
                              cursor={"pointer"}
                            />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>

                <SimpleGrid columns={[1, 1, 3, 4]} gap={2} mt={4}>
                  <Select placeholder="Salutation" name="salutation" required>
                    <option value="Mr"> Mr. </option>
                    <option value="Mrs"> Mrs. </option>
                    <option value="Ms"> Ms. </option>
                    <option value="Miss"> Miss. </option>
                    <option value="Prof"> Prof. </option>
                    <option value="Dr"> Dr. </option>
                  </Select>
                  <Input placeholder="First Name" name="firstName" required />
                  <Input placeholder="Last Name" name="lastName" required />
                </SimpleGrid>

                <SimpleGrid columns={[1, 1, 3, 4]} gap={2} mt={2}>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    required
                  />
                  <Input
                    type="number"
                    placeholder="Mobile Number"
                    name="mobileNo"
                    required
                  />
                  <Button type="submit"> Add Person </Button>
                </SimpleGrid>
              </TabPanel>
            </form>

            <form onSubmit={addBank}>
              <TabPanel>
                <TableContainer
                  border={"1px solid #f2f2f2"}
                  minH={20}
                  rounded={6}
                >
                  <Table size={"sm"}>
                    <Thead>
                      <Tr>
                        <Th fontSize={10}> Benificiary Name </Th>
                        <Th fontSize={10}> Bank Name </Th>
                        <Th fontSize={10}> Account No. </Th>
                        <Th fontSize={10}> IFSC Code </Th>
                        <Th> </Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {Array.from(bankDetails).map((elm, index) => (
                        <Tr key={elm.beneficiaryName + index}>
                          <Td> {elm.beneficiaryName} </Td>
                          <Td> {elm.bankName} </Td>
                          <Td> {elm.accountNumber} </Td>
                          <Td> {elm.IFSC} </Td>
                          <Td>
                            <MdDeleteForever
                              onClick={() => onRemoveBank(elm)}
                              fontSize={20}
                              cursor={"pointer"}
                            />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>

                <SimpleGrid columns={[1, 1, 2, 2]} gap={2} mt={2}>
                  <Input
                    name="beneficiaryName"
                    placeholder="Benificiary Name"
                    required
                  />
                  <Input
                    name="bankName"
                    placeholder="Bank Name"
                    value={bankDetails.bankName}
                    required
                  />

                  <Input
                    name="accountNumber"
                    placeholder="Account Number"
                    required
                  />
                  <Input name="IFSC" placeholder="IFSC Code" required />

                  <Button type="submit"> Add Bank </Button>
                </SimpleGrid>
              </TabPanel>
            </form>

            <TabPanel>
              <SimpleGrid columns={[1, 1, 2, 2]} gap={4}>
                <SimpleGrid gap={4}>
                  <Text fontSize={18} fontWeight={500} opacity={"70%"}>
                    {" "}
                    Billing Address{" "}
                  </Text>

                  <SimpleGrid gap={2}>
                    <Select
                      placeholder="Country"
                      value={billingAddress.country}
                      onChange={({ target }) =>
                        setBillingAddress((prev) => ({
                          ...prev,
                          country: target.value,
                        }))
                      }
                    >
                      {countries.map((country) => (
                        <option value={country} key={country}>
                          {" "}
                          {country}{" "}
                        </option>
                      ))}
                    </Select>
                    <Input
                      placeholder="City"
                      value={billingAddress.city}
                      onChange={({ target }) =>
                        setBillingAddress((prev) => ({
                          ...prev,
                          city: target.value,
                        }))
                      }
                    />
                    <Input
                      placeholder="State"
                      value={billingAddress.state}
                      onChange={({ target }) =>
                        setBillingAddress((prev) => ({
                          ...prev,
                          state: target.value,
                        }))
                      }
                    />
                    <Input
                      placeholder="Street"
                      value={billingAddress.street}
                      onChange={({ target }) =>
                        setBillingAddress((prev) => ({
                          ...prev,
                          street: target.value,
                        }))
                      }
                    />
                    <Input
                      placeholder="Zipcode"
                      value={billingAddress.zipCode}
                      onChange={({ target }) =>
                        setBillingAddress((prev) => ({
                          ...prev,
                          zipCode: target.value,
                        }))
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Mobile Number"
                      value={billingAddress.phone}
                      onChange={({ target }) =>
                        setBillingAddress((prev) => ({
                          ...prev,
                          phone: target.value,
                        }))
                      }
                    />
                  </SimpleGrid>
                </SimpleGrid>

                <SimpleGrid gap={4}>
                  <Text fontSize={18} fontWeight={500} opacity={"70%"}>
                    {" "}
                    Shipping Address{" "}
                  </Text>

                  <SimpleGrid gap={2}>
                    <Select
                      placeholder="Country"
                      value={shippingAddress.country}
                      onChange={({ target }) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          country: target.value,
                        }))
                      }
                    >
                      {countries.map((country) => (
                        <option value={country} key={country}>
                          {" "}
                          {country}{" "}
                        </option>
                      ))}
                    </Select>
                    <Input
                      placeholder="City"
                      value={shippingAddress.city}
                      onChange={({ target }) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          city: target.value,
                        }))
                      }
                    />
                    <Input
                      placeholder="State"
                      value={shippingAddress.state}
                      onChange={({ target }) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          state: target.value,
                        }))
                      }
                    />
                    <Input
                      placeholder="Street"
                      value={shippingAddress.street}
                      onChange={({ target }) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          street: target.value,
                        }))
                      }
                    />
                    <Input
                      placeholder="Zipcode"
                      value={shippingAddress.zipCode}
                      onChange={({ target }) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          zipCode: target.value,
                        }))
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Mobile Number"
                      value={shippingAddress.phone}
                      onChange={({ target }) =>
                        setShippingAddress((prev) => ({
                          ...prev,
                          phone: target.value,
                        }))
                      }
                    />
                  </SimpleGrid>
                </SimpleGrid>
              </SimpleGrid>
            </TabPanel>

            <TabPanel>
              <Textarea
                placeholder="Remark"
                value={remark}
                onChange={({ target }) => setRemark(target.value)}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>

      <Flex
        bg={"#fff"}
        position={"fixed"}
        bottom={0}
        w={"full"}
        p={4}
        zIndex={99}
      >
        <Button
          w={150}
          isLoading={isLoading}
          onClick={defaultValue ? onUpdate : onPost}
        >
          {defaultValue ? "Save" : "Create"}
        </Button>
      </Flex>
    </Stack>
  );
};

export { VendorInputForm };
