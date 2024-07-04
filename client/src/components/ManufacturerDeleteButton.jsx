import { Button, useDisclosure } from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import { deleteManufacturer } from "../actions/manufacturer.action";
import { DeleteAlert } from "./DeleteAlert";

const ManufacturerDeleteButton = ({ id, reload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = async () => {
    await deleteManufacturer(id);
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
        label="Delete Manufacturer"
        isOpen={isOpen}
        onClose={onClose}
        onDelete={onDelete}
      />
    </>
  );
};

export { ManufacturerDeleteButton };
