import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import { CustomerInputForm } from "../../components/CustomerInputForm";
import { getCustomerById } from "../../actions/customer.action";
import { Loading } from "../../components/Loading";

const UpdateCustomer = () => {

    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const load = async () => {
            try {
                let data = await getCustomerById(id);
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
            <CustomerInputForm defaultValue={data} />
        </Stack>
    )
}

export default UpdateCustomer;
