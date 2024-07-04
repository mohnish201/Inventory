import {
  HStack,
  Stack,
  Text,
  Flex,
  VStack,
  Input,
  FormControl,
  Box,
  Select,
  Button,
  useMenuOption,
  FormLabel,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { TbUpload } from "react-icons/tb";
import { GrFormEdit } from "react-icons/gr";
import { Country, State, City } from "country-state-city";
import {
  getOrganizationData,
  updateOrganizationDetails,
} from "../actions/organizationProfile.action";
import toast from "react-hot-toast";
import { getAllCurrency } from "../actions/currency.action";
import { Loading } from "./Loading";

const initState = {
  organizationLogo: "",
  organizationName: "",
  industry: "",
  location: "",
  address: {
    country: "",
    state: "",
    pincode: "",
    city: "",
    street: "",
  },
  websiteUrl: "",
  baseCurrency: "",
  primaryContact: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "UPLOAD_LOGO":
      return { ...state, organizationLogo: action.logo };

    case "UPDATE_FIELD":
      return { ...state, [action.name]: action.value };

    case "SAVE_DATA":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

const OrganizationProfileInputForm = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [logoFile, setLogoFile] = useState(null);
  const [currencyList, setCurrencyList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const {
    address,
    organizationName,
    organizationLogo,
    industry,
    location,
    websiteUrl,
    baseCurrency,
    primaryContact,
  } = state;

  const logoRef = useRef();
  const stateList = useMemo(() => {
    return State.getStatesOfCountry(address.country);
  }, [address.country]);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setLogoFile(file);
    console.log("Called");
    if (file) {
      const logoURL = URL.createObjectURL(file);
      dispatch({ type: "UPLOAD_LOGO", logo: logoURL });
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    if (new Set(["country", "state", "city", "pincode", "street"]).has(name)) {
      const updatedAddressData = { ...address, [name]: value };
      dispatch({
        type: "UPDATE_FIELD",
        name: "address",
        value: updatedAddressData,
      });
    } else {
      dispatch({ type: "UPDATE_FIELD", name, value });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // dispatch({ type: "SAVE_DATA", payload: state });
    let newState = { ...state };
    if (logoFile) {
      newState["organizationLogo"] = logoFile;
    } else {
      delete newState["organizationLogo"];
    }

    let formData = new FormData();

    for (let key in newState) {
      if (typeof newState[key] === "string" || newState[key] instanceof File) {
        formData.append(key, newState[key]);
      } else {
        formData.append(key, JSON.stringify(newState[key]));
      }
    }

    try {
      await updateOrganizationDetails(formData);
      toast.success("Success");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getInitialData = async () => {
      setFetching(true);
      try {
        let defaultValue = await getOrganizationData();
        let currencyList = await getAllCurrency();

        setCurrencyList(currencyList?.data);

        if (defaultValue) {
          dispatch({ type: "SAVE_DATA", payload: defaultValue });
        }
      } catch (_) {}
      setFetching(false);
    };

    getInitialData();
  }, []);

  if (fetching) return <Loading />;
  return (
    <Stack px={4}>
      {/* Header */}
      <Flex>
        <HStack>
          <CgProfile fontSize={24} />
          <Text fontSize={24} fontWeight={500} py={4}>
            Organization Profile
          </Text>
        </HStack>
      </Flex>

      {/* Logo */}
      <HStack alignItems={"flex-end"}>
        <VStack align={"left"}>
          <Text fontWeight={500} fontSize={16}>
            Organization Logo
          </Text>

          <VStack
            justifyContent={"center"}
            borderRadius={8}
            h={150}
            w={{ base: "100%", sm: 250 }}
            border={"1px dashed #b1b1b1"}
            bgImage={organizationLogo}
            bgSize={"contain"}
            bgPos={"center"}
            bgRepeat={"no-repeat"}
          >
            <Input
              ref={logoRef}
              type="file"
              accept="image/*"
              name="organizationLogo"
              onChange={handleLogoChange}
              display={"none"}
            />
            {!organizationLogo && (
              <VStack
                cursor={"pointer"}
                onClick={() => logoRef.current.click()}
                alignItems={"center"}
              >
                <TbUpload color="gray" fontSize={20} />
                <Text
                  textAlign={"center"}
                  px={4}
                  color={"gray"}
                  fontWeight={500}
                  fontSize={"sm"}
                >
                  Upload your Organization logo
                </Text>
              </VStack>
            )}
          </VStack>
        </VStack>

        <GrFormEdit
          cursor={"pointer"}
          onClick={() => logoRef.current.click()}
          fontSize={28}
        />
      </HStack>

      <VStack spacing={6} mt={4} align={"left"}>
        {/* Organization name */}
        <Stack
          justifyContent={"left"}
          spacing={6}
          alignItems={"center"}
          direction={{ base: "column", sm: "column", md: "row" }}
        >
          <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
            Organization Name<span style={{ color: "red" }}>*</span>
          </Text>

          <Box w={{ base: "100%", sm: "100%", md: "50%" }}>
            <Input
              name="organizationName"
              type="text"
              placeholder="Organization Name"
              value={organizationName}
              onChange={handleFieldChange}
            />
          </Box>
        </Stack>

        {/* Industry */}
        <Stack
          justifyContent={"left"}
          spacing={6}
          alignItems={"center"}
          direction={{ base: "column", sm: "column", md: "row" }}
        >
          <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
            Industry
          </Text>

          <Box w={{ base: "100%", sm: "100%", md: "50%" }}>
            <Input
              value={industry}
              name="industry"
              placeholder="Industry Type"
              type="text"
              onChange={handleFieldChange}
            />
          </Box>
        </Stack>

        {/*Organization Location  */}
        <Stack
          justifyContent={"left"}
          spacing={6}
          alignItems={"center"}
          direction={{ base: "column", sm: "column", md: "row" }}
        >
          <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
            Organization Location<span style={{ color: "red" }}>*</span>
          </Text>

          <Box w={{ base: "100%", sm: "100%", md: "50%" }}>
            <Input
              value={location}
              name="location"
              placeholder="Organization Location"
              type="text"
              onChange={handleFieldChange}
            />
          </Box>
        </Stack>

        {/* Organization Address*/}
        <Stack
          justifyContent={"left"}
          spacing={6}
          alignItems={"flex-start"}
          direction={{ base: "column", sm: "column", md: "row" }}
        >
          <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
            Organization Address<span style={{ color: "red" }}>*</span>
          </Text>

          <VStack alignItems={"left"}>
            <Stack
              direction={{ base: "column", md: "row" }}
              alignItems={"flex-start"}
            >
              <FormLabel
                display={{ base: "block", md: "none" }}
                fontSize={"sm"}
                mb={0}
              >
                Country
              </FormLabel>
              <Select
                w={{ base: "100%", sm: 200, md: 200, lg: 300 }}
                required
                name="country"
                value={address.country}
                placeholder="Select Country"
                onChange={handleFieldChange}
              >
                {Country.getAllCountries().map((el) => (
                  <option value={el.isoCode}>{el.name}</option>
                ))}
              </Select>

              <FormLabel
                display={{ base: "block", md: "none" }}
                fontSize={"sm"}
                mb={0}
              >
                State
              </FormLabel>

              <Select
                required
                name="state"
                placeholder="Select State"
                w={{ base: "100%", md: 200 }}
                value={address.state}
                onChange={handleFieldChange}
              >
                {stateList.map((el) => (
                  <option value={el.name}>{el.name}</option>
                ))}
              </Select>
            </Stack>

            <Stack
              direction={{ base: "column", md: "row" }}
              // alignItems={"center"}
            >
              <FormLabel
                display={{ base: "block", md: "none" }}
                fontSize={"sm"}
                mb={0}
              >
                City
              </FormLabel>
              <Input
                w={{ base: "100%", sm: 200, lg: 300 }}
                value={address?.city}
                required
                type="text"
                placeholder="City"
                name="city"
                onChange={handleFieldChange}
              />

              <FormLabel
                display={{ base: "block", md: "none" }}
                fontSize={"sm"}
                mb={0}
              >
                Pincode
              </FormLabel>
              <Input
                w={{ base: "100%", sm: 200 }}
                required
                type="number"
                placeholder="Pincode"
                name="pincode"
                value={address?.pincode}
                onChange={handleFieldChange}
              />
            </Stack>

            <FormLabel
              display={{ base: "block", md: "none" }}
              fontSize={"sm"}
              mb={0}
            >
              Street
            </FormLabel>
            <Input
              required
              type="text"
              value={address?.street}
              placeholder="Street"
              name="street"
              onChange={handleFieldChange}
            />
          </VStack>
        </Stack>

        {/* Website URL */}
        <Stack
          justifyContent={"left"}
          spacing={6}
          alignItems={"center"}
          direction={{ base: "column", md: "row" }}
        >
          <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
            Website URL<span style={{ color: "red" }}>*</span>
          </Text>

          <Box w={{ base: "100%", sm: "100%", md: "50%" }}>
            <Input
              value={websiteUrl}
              name="websiteUrl"
              placeholder="Website Url"
              type="url"
              onChange={handleFieldChange}
            />
          </Box>
        </Stack>

        {/* Base Currency */}
        <Stack
          justifyContent={"left"}
          spacing={6}
          alignItems={"center"}
          direction={{ base: "column", sm: "column", md: "row" }}
        >
          <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
            Base Currency<span style={{ color: "red" }}>*</span>
          </Text>

          <Box w={{ base: "100%", sm: "100%", md: "50%" }}>
            <Select
              onChange={handleFieldChange}
              name="baseCurrency"
              placeholder="Base Currency"
              value={baseCurrency}
            >
              {currencyList.map((currency) => (
                <option value={currency.currencyCode}>
                  {currency?.currencyName}
                </option>
              ))}
            </Select>
            {/* <Input
              name="baseCurrency"
              placeholder="Base Currency"
              type="text"
              value={baseCurrency}
              onChange={handleFieldChange}
              style={{ textTransform: "uppercase" }}
            /> */}
          </Box>
        </Stack>

        {/* Primary Contact */}
        <Stack
          justifyContent={"left"}
          spacing={6}
          alignItems={"center"}
          direction={{ base: "column", sm: "column", md: "row" }}
        >
          <Text fontWeight={500} w={{ base: "100%", sm: "100%", md: "20%" }}>
            Primary Contact<span style={{ color: "red" }}>*</span>
          </Text>

          <Box w={{ base: "100%", sm: "100%", md: "50%" }}>
            <Input
              name="primaryContact"
              placeholder="Organization Email-id"
              type="email"
              value={primaryContact}
              onChange={handleFieldChange}
            />
          </Box>
        </Stack>
      </VStack>

      <Flex p={2} columnGap={6} justifyContent={"flex-end"}>
        <Button isLoading={isLoading} onClick={handleSubmit}>
          Update
        </Button>
      </Flex>
    </Stack>
  );
};

export { OrganizationProfileInputForm };
