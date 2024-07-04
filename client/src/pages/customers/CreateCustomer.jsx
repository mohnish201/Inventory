import { useState } from "react";
import { Stack } from "@chakra-ui/react";
import { CustomerInputForm } from "../../components/CustomerInputForm";

const CreateCustomer = () => {

    const [key, setKey] = useState(1);

    return (
        <Stack>
            <CustomerInputForm key={key} clear={() => setKey((prev) => prev === 1 ? 0 : 1)} />
        </Stack>
    )
}

export default CreateCustomer;
