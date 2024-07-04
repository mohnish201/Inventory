import { Button, useDisclosure } from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import { deleteCategory } from "../actions/category.action";
import { DeleteAlert } from "./DeleteAlert";

const CategoryDeleteButton = ({ id, reload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = async () => {
    await deleteCategory(id);
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
        label="Delete Category"
        isOpen={isOpen}
        onClose={onClose}
        onDelete={onDelete}
      />
    </>
  );
};

export { CategoryDeleteButton };
