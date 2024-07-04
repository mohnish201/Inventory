import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import { useState } from "react";
import { toast } from "react-hot-toast";

const DeleteAlert = ({ isOpen, onClose, onDelete, label = "Delete" }) => {
  const [isLoading, setLoading] = useState(false);

  const onProceed = async () => {
    setLoading(true);

    try {
      await onDelete();
      onClose();
      toast.success("Success");
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {label}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button variant={"outline"} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              colorScheme="red"
              _hover={{ bgColor: "red.500" }}
              ml={3}
              onClick={onProceed}
              bg={"red"}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export { DeleteAlert };
