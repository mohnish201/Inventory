import { Stack } from '@chakra-ui/react';
import { VendorInputForm } from '../../components/VendorInputForm';
import { useState } from 'react';

const CreateVendor = () => {

    const [key, setKey] = useState(1);

    return (
        <Stack pb={20}>
            <VendorInputForm key={key} clear={() => setKey((prev) => prev == 1 ? 2 : 1)} />
        </Stack>
    )
}

export default CreateVendor;
