import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { DeleteAlert } from "./DeleteAlert";
import { deleteWarehouse } from "../actions/warehouse.action";
import { MdDeleteOutline } from "react-icons/md";

const WarehouseDeleteButton = ({ id, reload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = async () => {
    await deleteWarehouse(id);
    reload();
  };

  return (
    <Box>
      <Button
        size={"sm"}
        colorScheme="red"
        variant={"outline"}
        onClick={onOpen}
      >
        {" "}
        <MdDeleteOutline />{" "}
      </Button>
      <DeleteAlert
        label="Delete Warehouse"
        isOpen={isOpen}
        onClose={onClose}
        onDelete={onDelete}
      />
    </Box>
  );
};

export { WarehouseDeleteButton };
