import { Button, useDisclosure } from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import { deleteItem } from "../actions/item.action";
import { DeleteAlert } from "./DeleteAlert";

const ItemDeleteButton = ({ id, reload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = async () => {
    await deleteItem(id);
    reload();
  };

  return (
    <>
      <Button
        size={"sm"}
        variant={"outline"}
        colorScheme="red"
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

export { ItemDeleteButton };
