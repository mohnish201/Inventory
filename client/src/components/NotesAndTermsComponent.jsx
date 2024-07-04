import React from "react";
import { VStack, Textarea, FormControl, FormLabel } from "@chakra-ui/react";

const NotesAndTermsComponent = ({
  customerNote,
  termsAndCondition,
  handleFieldChange,
}) => {
  return (
    <VStack spacing={4} w={{ base: "100%", md: "40%" }}>
      <FormControl id="customerNote">
        <FormLabel>Customer Note</FormLabel>
        <Textarea
          value={customerNote}
          onChange={handleFieldChange}
          name="customerNote"
          placeholder="Add a note for the customer"
        />
      </FormControl>
      <FormControl id="termsAndCondition">
        <FormLabel>Terms & Conditions</FormLabel>
        <Textarea
          value={termsAndCondition}
          onChange={handleFieldChange}
          name="termsAndCondition"
          placeholder="Add terms and conditions"
        />
      </FormControl>
    </VStack>
  );
};

export default NotesAndTermsComponent;
