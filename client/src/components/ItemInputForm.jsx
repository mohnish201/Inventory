import {
  Stack,
  Flex,
  Text,
  Radio,
  RadioGroup,
  Input,
  Select,
  Image,
  Avatar,
  SimpleGrid,
  Switch,
  Button,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { getManufacturers } from "../actions/manufacturer.action";
import { getVendors } from "../actions/vendor.action";
import { getAllBrands } from "../actions/brand.actions";
import { getWarehouses } from "../actions/warehouse.action";
import { toast } from "react-hot-toast";
import { getCategories } from "../actions/category.action";
import { addItem, updateItem } from "../actions/item.action";
import { Loading } from "./Loading";

const ItemInputForm = ({ defaultValue, clear }) => {
  const maxFiles = 5;
  const fileRef = useRef();
  const [key, setKey] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isFetching, setFetching] = useState(true);

  const [types, setTypes] = useState("goods");
  const [name, setName] = useState("");
  const [SKU, setSKU] = useState("");
  const [unit, setUnit] = useState("");
  const [itemsImage, setItemsImage] = useState([]);

  const [dimensions, setDimentions] = useState({
    length: 0,
    width: 0,
    height: 0,
    unit: "inch",
  });

  const [weight, setWeight] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [UPC, setUPC] = useState("");
  const [EAN, setEAN] = useState("");
  const [MPN, setMPN] = useState("");
  const [ISBN, setISBN] = useState("");

  const [purchaseInformation, setPurchaseInformation] = useState({
    costPrice: "",
    description: "",
    preferredVendor: "",
  });

  const [salesInformation, setSalesInformation] = useState({
    sellingPrice: "",
    description: "",
  });

  const [trackInventory, setTrackInventory] = useState(false);
  const [openingStock, setOpeningStock] = useState("");
  const [reorderPoint, setReorderPoint] = useState("");
  const [openingStockRatePerUnit, setOpeningStockRatePerUnit] = useState("");

  const [manufacturers, setManufacturers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const itemImageSource = useMemo(() => {
    const sources = [];

    for (let i = 0; i < Math.min(itemsImage.length, maxFiles); i++) {
      const item = itemsImage[i];

      if (typeof item === "string") {
        sources[i] = item;
      } else {
        sources[i] = URL.createObjectURL(item);
      }
    }

    return sources;
  }, [itemsImage]);

  useEffect(() => {
    const load = async () => {
      try {
        let manufacturers = await getManufacturers();
        let vendors = await getVendors();
        let brands = await getAllBrands();
        let categories = await getCategories();
        let warehouses = await getWarehouses();

        setManufacturers(manufacturers.data);
        setVendors(vendors.data);
        setBrands(brands.data);
        setCategories(categories.data);
        setWarehouses(warehouses.data);
      } catch (error) {
        console.log(error);
      }

      setFetching(false);
    };

    load();
  }, []);

  useEffect(() => {
    if (defaultValue) {
      setTypes(defaultValue.types);
      setName(defaultValue.name);
      setSKU(defaultValue.SKU);
      setUnit(defaultValue.unit);
      setItemsImage(defaultValue.itemsImage);
      setDimentions(defaultValue.dimensions);
      setWeight(defaultValue.weight);
      setManufacturer(defaultValue.manufacturer);
      setBrand(defaultValue.brand);
      setCategory(defaultValue.category);
      setUPC(defaultValue.UPC);
      setEAN(defaultValue.EAN);
      setMPN(defaultValue.MPN);
      setISBN(defaultValue.ISBN);
      setPurchaseInformation(defaultValue.purchaseInformation);
      setSalesInformation(defaultValue.salesInformation);
      setTrackInventory(defaultValue.trackInventory);
      setOpeningStock(defaultValue.openingStock);
      setReorderPoint(defaultValue.reorderPoint);
      setOpeningStockRatePerUnit(defaultValue.openingStockRatePerUnit);
      setWarehouse(defaultValue?.warehouse);
    }
  }, []);

  const onAddImage = (file) => {
    if (itemsImage.length === 5) {
      toast.error("You can't add more than 5 images");
      return;
    }
    const newStates = [...itemsImage, file];
    setKey((prev) => (prev === 1 ? 0 : 1));
    setActiveIndex(newStates.length - 1);
    setItemsImage(newStates);
  };

  const onRemoveImage = () => {
    const newStates = [...itemsImage];
    newStates.splice(activeIndex, 1);
    setKey((prev) => (prev === 1 ? 0 : 1));
    setActiveIndex(newStates.length - 1);
    setItemsImage(newStates);
  };

  const getFormData = () => {
    const payload = {
      types,
      name,
      SKU,
      unit,
      itemsImage,
      dimensions,
      weight,
      manufacturer,
      brand,
      category,
      UPC,
      EAN,
      MPN,
      ISBN,
      purchaseInformation,
      salesInformation,
      trackInventory,
      openingStock,
      openingStockRatePerUnit,
      reorderPoint,
      warehouse,
    };

    const formData = new FormData();

    for (const key in payload) {
      const value = payload[key];

      if (typeof value === "string") {
        formData.append(key, value);
        continue;
      }

      if (value instanceof Array) {
        value.forEach((file) => {
          formData.append(key, file);
        });

        continue;
      }

      formData.append(key, JSON.stringify(value));
    }

    return formData;
  };

  const onPost = async () => {
    const formData = getFormData();

    setLoading(true);

    try {
      await addItem(formData);
      clear();
      toast.success("Success");
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  const onUpdate = async () => {
    const formData = getFormData();

    setLoading(true);

    try {
      await updateItem(formData, defaultValue._id);
      toast.success("Success");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setLoading(false);
  };

  if (isFetching) return <Loading />;

  return (
    <Stack p={4}>
      <Text fontWeight={500} fontSize={26}>
        {" "}
        {defaultValue ? "Update Item" : "Create Item"}{" "}
      </Text>

      <Flex
        gap={[10, 10, "10%", "30%"]}
        direction={["column", "column", "row", "row"]}
        mt={6}
      >
        <Stack w={["100%", 400, 400, 400]}>
          <RadioGroup value={types} onChange={setTypes} mb={6}>
            <Stack direction="row">
              <Text fontWeight={600} mr={6}>
                {" "}
                Item Type{" "}
              </Text>
              <Radio value="goods"> Goods </Radio>
              <Radio value="service"> Service </Radio>
            </Stack>
          </RadioGroup>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <Input
            type="text"
            placeholder="SKU"
            value={SKU}
            onChange={({ target }) => setSKU(target.value)}
          />
          <Select
            placeholder="Select Unit"
            value={unit}
            onChange={({ target }) => setUnit(target.value)}
          >
            <option value="dozens"> Dozens </option>
            <option value="boxs"> Boxes </option>
            <option value="grams"> Grams </option>
            <option value="kilograms"> Kilograms </option>
            <option value="meters"> Meters </option>
            <option value="tablets"> Tablets </option>
            <option value="units"> Units </option>
            <option value="pieces"> Pieces </option>
            <option value="pairs"> Pairs </option>
          </Select>
        </Stack>

        <Stack spacing={4}>
          <Text fontWeight={500} fontSize={16}>
            {" "}
            Item Image{" "}
          </Text>
          <Flex
            overflow={"hidden"}
            userSelect={"none"}
            direction={"column"}
            w={["100%", 400, 250, 250]}
            h={200}
            border={"1px solid #f2f2f2"}
            justifyContent={"center"}
            alignItems={"center"}
            position={"relative"}
          >
            <Input
              key={key}
              max={5}
              display={"none"}
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={({ target }) => onAddImage(target.files[0])}
            />

            {itemImageSource.length !== 0 && (
              <Text
                position={"absolute"}
                right={0}
                bottom={0}
                p={2}
                fontSize={18}
                zIndex={10}
                onClick={onRemoveImage}
              >
                <MdDelete />
              </Text>
            )}

            {itemImageSource?.length ? (
              <Image src={itemImageSource[activeIndex]} />
            ) : (
              <>
                <MdOutlineInsertPhoto fontSize={52} opacity={"70%"} />
                <Text fontWeight={400} opacity={"70%"}>
                  {" "}
                  Add Images (max {maxFiles}){" "}
                </Text>
              </>
            )}
          </Flex>

          <Flex alignItems={"center"} gap={2}>
            {itemImageSource.map((src, index) => (
              <Avatar
                cursor={"pointer"}
                onClick={() => setActiveIndex(index)}
                border={"2px solid #f2f2f2"}
                size={"sm"}
                src={src}
                key={src + index}
              />
            ))}

            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              border={"2px solid #f2f2f2"}
              h={8}
              w={8}
              rounded={"full"}
              opacity={"80%"}
              onClick={() => fileRef.current.click()}
              cursor={"pointer"}
            >
              <GoPlus />
            </Flex>
          </Flex>
        </Stack>
      </Flex>

      <Tabs colorScheme="twitter" variant="enclosed" mt={4} userSelect={"none"}>
        <TabList flexWrap={"wrap"}>
          <Tab fontSize={14} fontWeight={500}>
            {" "}
            Product Information{" "}
          </Tab>
          <Tab fontSize={14} fontWeight={500}>
            {" "}
            Purchase Information{" "}
          </Tab>
          <Tab fontSize={14} fontWeight={500}>
            {" "}
            Sales Information{" "}
          </Tab>
          <Tab fontSize={14} fontWeight={500}>
            {" "}
            Inventory Information{" "}
          </Tab>
        </TabList>

        <TabPanels pb={100}>
          <TabPanel>
            <Stack spacing={3}>
              <Text fontSize={[12, 14, 14, 16]}>
                {" "}
                Dimentions (Lenghth * Width * Height){" "}
              </Text>
              <Select
                w={["100%", 400, 400, 400]}
                value={dimensions.unit}
                onChange={({ target }) =>
                  setDimentions((prev) => ({ ...prev, unit: target.value }))
                }
              >
                <option value="inch"> Inches </option>
                <option value="cm"> Centimeters </option>
              </Select>
              <Flex
                w={["100%", 400, 400, 400]}
                alignItems={"center"}
                gap={[1, 2, 3, 4]}
              >
                <Input
                  type="number"
                  placeholder="Length"
                  value={dimensions.length}
                  onChange={({ target }) =>
                    setDimentions((prev) => ({ ...prev, length: target.value }))
                  }
                />
                <RxCross2 fontSize={40} />
                <Input
                  type="number"
                  placeholder="Width"
                  value={dimensions.width}
                  onChange={({ target }) =>
                    setDimentions((prev) => ({ ...prev, width: target.value }))
                  }
                />
                <RxCross2 fontSize={40} />
                <Input
                  type="number"
                  placeholder="Height"
                  value={dimensions.height}
                  onChange={({ target }) =>
                    setDimentions((prev) => ({ ...prev, height: target.value }))
                  }
                />
              </Flex>

              <SimpleGrid
                columns={[1, 2, 2, 2]}
                gap={4}
                w={["100%", "100%", "100%", 700]}
              >
                <Select
                  placeholder="Manufacturer"
                  value={manufacturer}
                  onChange={({ target }) => setManufacturer(target.value)}
                >
                  {manufacturers.map(({ _id, manufacturerName }) => (
                    <option value={_id} key={_id}>
                      {" "}
                      {manufacturerName}{" "}
                    </option>
                  ))}
                </Select>
                <Select
                  placeholder="Warehouse"
                  value={warehouse}
                  onChange={({ target }) => setWarehouse(target.value)}
                >
                  {warehouses.map(({ _id, warehouseName }) => (
                    <option value={_id} key={_id}>
                      {" "}
                      {warehouseName}{" "}
                    </option>
                  ))}
                </Select>
                <Select
                  placeholder="Brand"
                  value={brand}
                  onChange={({ target }) => setBrand(target.value)}
                >
                  {brands.map(({ _id, brandName }) => (
                    <option value={_id} key={_id}>
                      {" "}
                      {brandName}{" "}
                    </option>
                  ))}
                </Select>
                <Select
                  placeholder="Category"
                  value={category}
                  onChange={({ target }) => setCategory(target.value)}
                >
                  {categories.map(({ _id, categoryName }) => (
                    <option value={_id} key={_id}>
                      {" "}
                      {categoryName}{" "}
                    </option>
                  ))}
                </Select>
                <Input
                  placeholder="Weight"
                  value={weight}
                  onChange={({ target }) => setWeight(target.value)}
                />
                <Input
                  placeholder="UPC"
                  value={UPC}
                  onChange={({ target }) => setUPC(target.value)}
                />
                <Input
                  placeholder="EAN"
                  value={EAN}
                  onChange={({ target }) => setEAN(target.value)}
                />
                <Input
                  placeholder="MPN"
                  value={MPN}
                  onChange={({ target }) => setMPN(target.value)}
                />
                <Input
                  placeholder="ISBN"
                  value={ISBN}
                  onChange={({ target }) => setISBN(target.value)}
                />
              </SimpleGrid>
            </Stack>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={[1, 2, 2, 2]} gap={4}>
              <Input
                type="number"
                placeholder="Cost Price"
                value={purchaseInformation.costPrice}
                onChange={({ target }) =>
                  setPurchaseInformation((prev) => ({
                    ...prev,
                    costPrice: target.value,
                  }))
                }
              />

              <Input
                placeholder="Description"
                value={purchaseInformation.description}
                onChange={({ target }) =>
                  setPurchaseInformation((prev) => ({
                    ...prev,
                    description: target.value,
                  }))
                }
              />

              <Select
                placeholder="Vendor"
                value={purchaseInformation.preferredVendor}
                onChange={({ target }) =>
                  setPurchaseInformation((prev) => ({
                    ...prev,
                    preferredVendor: target.value,
                  }))
                }
              >
                {vendors.map(({ _id, firstName, lastName }) => (
                  <option value={_id} key={_id}>
                    {" "}
                    {firstName} {lastName}{" "}
                  </option>
                ))}
              </Select>
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={[1, 2, 2, 3]} gap={4}>
              <Input
                type="number"
                placeholder="Selling Price"
                value={salesInformation.sellingPrice}
                onChange={({ target }) =>
                  setSalesInformation((prev) => ({
                    ...prev,
                    sellingPrice: target.value,
                  }))
                }
              />

              <Input
                placeholder="Description"
                value={salesInformation.description}
                onChange={({ target }) =>
                  setSalesInformation((prev) => ({
                    ...prev,
                    description: target.value,
                  }))
                }
              />
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <Flex alignItems={"center"} gap={2}>
              <Text fontWeight={500} fontSize={18}>
                {" "}
                Track Inventory?{" "}
              </Text>
              <Switch
                isChecked={trackInventory}
                onChange={({ target }) => setTrackInventory(target.checked)}
              />
            </Flex>
            <SimpleGrid mt={4} w={["100%", "100%", 500, 500]} gap={2}>
              <Input
                type="number"
                placeholder="Opening Stock"
                value={openingStock}
                onChange={({ target }) => setOpeningStock(target.value)}
              />
              <Input
                type="number"
                placeholder="Rate of Opening Stock"
                value={openingStockRatePerUnit}
                onChange={({ target }) =>
                  setOpeningStockRatePerUnit(target.value)
                }
              />
              <Input
                type="number"
                placeholder="Reorder Point"
                value={reorderPoint}
                onChange={({ target }) => setReorderPoint(target.value)}
              />
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Flex
        borderTop={"1px solid"}
        borderColor={"inherit"}
        bg={"#fff"}
        position={"fixed"}
        bottom={0}
        w={"full"}
        p={2}
        zIndex={99}
      >
        <Button
          size={"md"}
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

export { ItemInputForm };
