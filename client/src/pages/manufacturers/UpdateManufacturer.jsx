import { Text, Input, Button, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getManufacturerById, updateManufacturer } from '../../actions/manufacturer.action';
import { Loading } from '../../components/Loading';
import { useParams } from 'react-router-dom';

const UpdateManufacturer = () => {

    const { id } = useParams();

    const [fetching, setFetching] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [manufacturerName, setManufacturerName] = useState('');

    const onUpdate = async () => {

        if (!manufacturerName) {
            toast.error('Name not provided');
            return;
        }

        try {
            await updateManufacturer({ manufacturerName }, id);
            toast.success('Success');
        } catch (error) {
            toast.error(error.message)
        }

        setLoading(false);

    }

    useEffect(() => {

        const load = async () => {

            setFetching(true);

            try {
                let data = await getManufacturerById(id);
                setManufacturerName(data.manufacturerName);
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
            <Text fontSize={24} fontWeight={500} py={4}> Manage manufacturer </Text>
            <Input w={400} placeholder='Name' value={manufacturerName} onChange={({ target }) => setManufacturerName(target.value)} />
            <Button isLoading={isLoading} onClick={onUpdate}> Save </Button>
        </VStack>
    )
}

export default UpdateManufacturer;
