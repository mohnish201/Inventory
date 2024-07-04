import { VStack, SimpleGrid, Input, Text, Select, Button } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import currencies from '../constants/currencies.json';
import { toast } from 'react-hot-toast';
import { patchCurrency, postCurrency } from '../actions/currency.action';

const CurrencyInputForm = ({ defaultValue }) => {

    const [currencyCode, setCurrencyCode] = useState('');
    const [currencyName, setCurrencyName] = useState('');

    const [currencySymbol, decimalPlace] = useMemo(() => {

        if (!currencyCode) {
            return ['', '']
        }

        const { name, symbol, decimal_digits } = currencies.find(({ code }) => code === currencyCode);
        setCurrencyName(name);
        return [symbol, decimal_digits]
    }, [currencyCode])

    const [isLoading, setLoading] = useState(false);

    const onPost = async () => {

        const payload = {
            currencyCode,
            currencyName,
            currencySymbol,
            decimalPlace
        }

        setLoading(true);

        try {
            await postCurrency(payload);
            setCurrencyCode('');
            setCurrencyName('');
            toast.success('Success');
        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);

    }

    const onSave = async () => {

        const payload = {
            currencyCode,
            currencyName,
            currencySymbol,
            decimalPlace
        }

        setLoading(true);

        try {
            await patchCurrency(defaultValue._id, payload);
            toast.success('Success');
        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);
    }

    useEffect(() => {

        if (defaultValue) {
            setCurrencyCode(defaultValue.currencyCode);
            setCurrencyName(defaultValue.currencyName);
        }

    }, [])

    return (
        <VStack>

            <Text fontSize={24} fontWeight={500} py={4}> {defaultValue ? 'Update Currency' : 'Add New Currency'} </Text>
            <SimpleGrid w={['94%', 400, 400, 400]}>

                <Text fontWeight={500} py={2}> Currency </Text>
                <Select placeholder='Select Currency Code' value={currencyCode} onChange={({ target }) => setCurrencyCode(target.value)}>
                    {currencies.map(({ code }) => (
                        <option key={code} value={code}> {code} </option>
                    ))}
                </Select>

                <Text fontWeight={500} py={2}> Currency Name </Text>
                <Input
                    value={currencyName}
                    onChange={({ target }) => setCurrencyName(target.value)}
                    placeholder='Currency Name'
                />

                <Text fontWeight={500} py={2}> Symbol </Text>
                <Input placeholder='Symbol' value={currencySymbol} readOnly />

                <Text fontWeight={500} py={2}> Decimale Places </Text>
                <Input placeholder='Decimale Places' value={decimalPlace} readOnly />

                <Button
                    my={6}
                    isLoading={isLoading}
                    onClick={defaultValue ? onSave : onPost}
                >
                    {defaultValue ? 'Save' : 'Add'}
                </Button>
            </SimpleGrid>
        </VStack>
    )
}

export { CurrencyInputForm }
