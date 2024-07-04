import { Text, Input, Button, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { addManufacturer } from '../../actions/manufacturer.action';

const CreateManufacturer = () => {

    const [isLoading, setLoading] = useState(false);
    const [manufacturerName, setManufacturerName] = useState('');

    const onAdd = async () => {

        if (!manufacturerName) {
            toast.error('Name not provided');
            return;
        }

        setLoading(true);

        try {
            await addManufacturer({ manufacturerName });
            setManufacturerName('');
            toast.success('Success');
        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);

    }

    return (
        <VStack>
            <Text fontSize={24} fontWeight={500} py={4}> Create manufacturer </Text>
            <Input w={400} placeholder='Name' value={manufacturerName} onChange={({ target }) => setManufacturerName(target.value)} />
            <Button isLoading={isLoading} onClick={onAdd}> Add </Button>
        </VStack>
    )
}

export default CreateManufacturer;
