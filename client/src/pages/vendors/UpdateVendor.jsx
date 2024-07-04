import { Stack } from '@chakra-ui/react';
import { VendorInputForm } from '../../components/VendorInputForm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVendorById } from '../../actions/vendor.action';
import { Loading } from '../../components/Loading';

const UpdateVendor = () => {

    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const load = async () => {
            try {
                let data = await getVendorById(id);
                setData(data)
            } catch (_) {
                console.log(_)
            }

            setLoading(false);
        }

        load()

    }, [])

    if (loading) return <Loading />

    return (
        <Stack>
            <VendorInputForm defaultValue={data} />
        </Stack>
    )
}

export default UpdateVendor;
