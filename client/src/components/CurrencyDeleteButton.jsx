import { Button, useDisclosure } from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import { DeleteAlert } from "./DeleteAlert";
import { deleteCurrency } from "../actions/currency.action";

const CurrencyDeleteButton = ({ id, reload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = async () => {
    await deleteCurrency(id);
    reload();
  };

  return (
    <>
      <Button
        colorScheme="red"
        variant={"outline"}
        size={"sm"}
        onClick={onOpen}
      >
        <MdDeleteOutline fontSize={16} />
      </Button>
      <DeleteAlert
        isOpen={isOpen}
        onClose={onClose}
        label="Delete Currency"
        onDelete={onDelete}
      />
    </>
  );
};

export { CurrencyDeleteButton };
