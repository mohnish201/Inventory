import { useState } from "react";
import { Text, VStack, Input, Button, SimpleGrid } from "@chakra-ui/react";
import { addBrand } from "../../actions/brand.actions";
import { toast } from 'react-hot-toast';

const CreateBrand = () => {

    const [isLoading, setLoading] = useState(false);

    const add = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        setLoading(true);

        try {
            await addBrand(formData);
            event.target.reset();
            toast.success('Success');
        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);
    }

    return (
        <VStack>
            <form onSubmit={add}>
                <SimpleGrid w={400} gap={4} mt={6}>
                    <Text fontSize={24} fontWeight={500}> Create Brand </Text>
                    <Input type='text' name={'brandName'} placeholder={'Brand Name'} required />
                    <Button type='submit' isLoading={isLoading}> Create </Button>
                </SimpleGrid>
            </form>
        </VStack>
    )
}

export default CreateBrand;
