import { Button, useDisclosure } from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import { DeleteAlert } from "./DeleteAlert";
import { deleteInvoice } from "../actions/invoice.action";

const InvoiceDeleteButton = ({ id, reload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = async () => {
    try {
      await deleteInvoice(id);
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

export { InvoiceDeleteButton };
