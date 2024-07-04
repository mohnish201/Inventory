import { Button, useDisclosure } from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import { deleteVendor } from "../actions/vendor.action";
import { DeleteAlert } from "./DeleteAlert";

const VendorDeleteButton = ({ id, reload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = async () => {
    await deleteVendor(id);
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
        label="Delete Vendor"
        isOpen={isOpen}
        onClose={onClose}
        onDelete={onDelete}
      />
    </>
  );
};

export { VendorDeleteButton };
