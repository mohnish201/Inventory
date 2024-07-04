import { Text, Input, Button, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { addCategory } from '../../actions/category.action';

const CreateCategory = () => {

    const [isLoading, setLoading] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    const onAdd = async () => {

        if (!categoryName) {
            toast.error('Name not provided');
            return;
        }

        setLoading(true);

        try {
            await addCategory({ categoryName });
            setCategoryName('');
            toast.success('Success');
        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);

    }

    return (
        <VStack>
            <Text fontSize={24} fontWeight={500} py={4}> Create Category </Text>
            <Input w={400} placeholder='Name' value={categoryName} onChange={({ target }) => setCategoryName(target.value)} />
            <Button isLoading={isLoading} onClick={onAdd}> Add </Button>
        </VStack>
    )
}

export default CreateCategory;
