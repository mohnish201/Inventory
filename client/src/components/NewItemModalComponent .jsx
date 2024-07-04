import React from "react";
import {
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Button,
  Select,
  FormHelperText,
} from "@chakra-ui/react";
import ReactSelect from "react-select";

const NewItemModalComponent = ({
  isOpen,
  onOpen,
  onClose,
  addNewRow,
  initialRef,
  finalRef,
  setItemData,
  itemData,
  itemsList,
}) => {
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
  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
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
                ref={initialRef}
                placeholder="Select an Item"
                options={itemsOptions}
                onChange={(e) => setItemData(e)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Quantity</FormLabel>
              <Input
                name="quantity"
                required
                placeholder="Add Quantity"
                type="number"
                defaultValue={1}
                max={`${itemData?.currentStock}`}
              />
              <FormHelperText
                textAlign={"right"}
                fontSize={"xs"}
                color={"blue"}
              >
                Quantity must be less or equal to {itemData?.currentStock || 0}
              </FormHelperText>
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

              <FormControl mt={4}>
                <FormLabel>Discount</FormLabel>
                <HStack>
                  <Input
                    name="discountPercent"
                    required
                    type="number"
                    placeholder="0.00"
                    textAlign={"right"}
                    defaultValue={0}
                  />
                  <Select>
                    <option selected value="%">
                      %
                    </option>
                    {/* <option value="Rs.">Rs.</option> */}
                  </Select>
                </HStack>
              </FormControl>
            </HStack>

            {/* <FormControl mt={4}>
                <FormLabel>Amount</FormLabel>
                <Input
                  name="amount"
                  required
                  type="number"
                  placeholder="Enter Amount"
                />
              </FormControl> */}
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
  );
};

export default NewItemModalComponent;
