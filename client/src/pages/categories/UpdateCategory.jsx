import { Text, Input, Button, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getCategoryById, updateCategory } from '../../actions/category.action';
import { Loading } from '../../components/Loading';
import { useParams } from 'react-router-dom';


const UpdateCategory = () => {

    const { id } = useParams();

    const [fetching, setFetching] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    const onUpdate = async () => {

        if (!categoryName) {
            toast.error('Name not provided');
            return;
        }

        setLoading(true);

        try {
            await updateCategory({ categoryName }, id);
            toast.success('Success');
        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);

    }

    useEffect(() => {

        const load = async () => {

            setFetching(true);

            try {
                let data = await getCategoryById(id);
                setCategoryName(data.categoryName);
            } catch (error) {
                console.log(error)
            }

            setFetching(false);
        }

        load();
    }, [])

    if (fetching) return <Loading />

    return (
        <VStack>
            <Text fontSize={24} fontWeight={500} py={4}> Update Category </Text>
            <Input w={400} placeholder='Name' value={categoryName} onChange={({ target }) => setCategoryName(target.value)} />
            <Button isLoading={isLoading} onClick={onUpdate}> Save </Button>
        </VStack>
    )
}

export default UpdateCategory;
