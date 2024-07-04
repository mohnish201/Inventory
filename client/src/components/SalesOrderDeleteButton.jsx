import { Button, useDisclosure } from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import { DeleteAlert } from "./DeleteAlert";
import { deleteSalesOrder } from "../actions/salesOrder.action";

const SalesOrderDeleteButton = ({ id, reload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = async () => {
    try {
      await deleteSalesOrder(id);
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

export { SalesOrderDeleteButton };
