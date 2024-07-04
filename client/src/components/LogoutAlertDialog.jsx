import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";
import { MdOutlineLogout } from "react-icons/md";

function LogoutAlertDialog({ isOpen, onOpen, logout, onClose }) {
  const closeAlert = () => {
    logout();
    onClose();
  };

  return (
    <>
      <HStack onClick={onOpen}>
        <MdOutlineLogout fontSize={"24px"} />
        <Text fontSize={"md"} fontWeight={500}>
          Logout
        </Text>
      </HStack>

      <AlertDialog
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              display={"flex"}
              alignItems={"center"}
              fontSize="lg"
              fontWeight="bold"
              columnGap={4}
            >
              <MdOutlineLogout /> Logout
            </AlertDialogHeader>

            <AlertDialogBody fontSize={"lg"} fontWeight={500}>
              Are you sure? You want to Logout
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose} variant={"outline"}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={closeAlert} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export { LogoutAlertDialog };
