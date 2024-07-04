import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const PDFDrawer = ({
  pdfUrl,
  handleGeneratePdf,
  isLoading,
  children,
  sendEmail,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = async () => {
    await handleGeneratePdf();
    onOpen();
  };
  return (
    <>
      <Button
        isLoading={isLoading}
        onClick={handleClick}
        color={"blue"}
        variant={"link"}
      >
        {children}
      </Button>
      <Drawer
        size={"lg"}
        isOpen={isOpen && pdfUrl}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <iframe
              src={pdfUrl}
              width="100%"
              height="500px"
              title="Invoice PDF Preview"
            />
          </DrawerBody>

          <DrawerFooter>
            <Button onClick={sendEmail} colorScheme="blue">
              Send Mail
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PDFDrawer;
