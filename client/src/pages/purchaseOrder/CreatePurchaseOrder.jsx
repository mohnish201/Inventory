import { Stack } from "@chakra-ui/react";
import React from "react";
import { PurchaseOrderInputForm } from "../../components/PurchaseOrderInputForm";

const CreatePurchaseOrder = () => {
  return (
    <Stack>
      <PurchaseOrderInputForm />
    </Stack>
  );
};

export default CreatePurchaseOrder;
