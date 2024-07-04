import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { deletePurchaseOrder } from "../actions/purchaseOrder.action";
import { MdDeleteOutline } from "react-icons/md";
import { DeleteAlert } from "./DeleteAlert";

const PurchaseOrderDeleteButton = ({ id, reload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = async () => {
    try {
      await deletePurchaseOrder(id);
    } catch (error) {
      console.log(error);
    }
    reload();
  };
  return (
    <>
      <Button
        size={"sm"}
        colorScheme="red"
        variant={"outline"}
        onClick={onOpen}
      >
        <MdDeleteOutline />
      </Button>
      <DeleteAlert
        label="Delete Item"
        isOpen={isOpen}
        onClose={onClose}
        onDelete={onDelete}
      />
    </>
  );
};

export default PurchaseOrderDeleteButton;
