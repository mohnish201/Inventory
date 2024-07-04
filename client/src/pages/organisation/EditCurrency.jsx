import { useEffect, useState } from "react";
import { getCurrencyById } from "../../actions/currency.action";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/Loading";

import { VStack, Text } from "@chakra-ui/react";
import { CurrencyInputForm } from "../../components/CurrencyInputForm";

const EditCurrency = () => {

    const { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {

        const loadCurrency = async () => {

            try {
                let { data } = await getCurrencyById(id)
                setData(data);
            } catch (_) {
                setData(null);
            }

            setLoading(false);
        }

        loadCurrency();

    }, [])

    if (isLoading) return <Loading />

    return (
        <VStack>
            {data ? (
                <CurrencyInputForm defaultValue={data} />
            ) : (
                <Text my={6}> Not Found </Text>
            )}
        </VStack>
    )
}

export default EditCurrency;
