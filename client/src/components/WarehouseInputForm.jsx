import { Input, Select, SimpleGrid, VStack, Text, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { addWarehouse, updateWarehouse } from '../actions/warehouse.action';
import countries from '../constants/countries.json';

const baseStructure = {
    warehouseName: '',
    phone: '',
    address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India',
    },
    status: 'active'
}

const WarehouseInputForm = ({ defaultValue }) => {

    const [isLoading, setLoading] = useState(false);
    const [inputs, setInputs] = useState(JSON.parse(JSON.stringify(baseStructure)));


    const onAdd = async () => {

        const payload = {
            ...inputs,
            phone: Number(inputs.phone)
        }

        setLoading(true);

        try {
            await addWarehouse(payload);
            setInputs(baseStructure);
            toast.success('Success');
        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);
    }

    const onUpdate = async () => {
        const payload = {
            ...inputs,
            phone: Number(inputs.phone)
        }

        setLoading(true);

        try {
            await updateWarehouse(payload, defaultValue._id);
            toast.success('Success');
        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);
    }

    useEffect(() => {
        if (defaultValue) {
            setInputs(defaultValue);
        }
    }, [])

    return (
        <VStack w={'96%'}>
            <Text textAlign={'center'} my={4} fontWeight={500} fontSize={22}> {defaultValue ? 'Update Warehouse' : 'Fill Warehouse Details'} </Text>
            <SimpleGrid columns={[1, 1, 2, 2]} gap={2} w={['100%', '100%', '100%', 600]}>

                <Input
                    value={inputs.warehouseName}
                    onChange={({ target }) => setInputs((prev) => ({ ...prev, warehouseName: target.value }))}
                    type='text' placeholder='Warehouse Name'
                />

                <Input
                    value={inputs.phone}
                    onChange={({ target }) => setInputs((prev) => ({ ...prev, phone: target.value }))}
                    type='number' placeholder='Phone'
                />

                <Select
                    value={inputs.address.country}
                    onChange={({ target }) => setInputs((prev) => ({ ...prev, address: { ...prev.address, country: target.value } }))}
                >
                    {countries.map((country) => (
                        <option value={country} key={country}> {country} </option>
                    ))}

                </Select>

                <Input
                    value={inputs.address.zipCode}
                    onChange={({ target }) => setInputs((prev) => ({ ...prev, address: { ...prev.address, zipCode: target.value } }))}
                    type='number' placeholder='Zipcode'
                />

                <Input
                    value={inputs.address.state}
                    onChange={({ target }) => setInputs((prev) => ({ ...prev, address: { ...prev.address, state: target.value } }))}
                    placeholder='State'
                />

                <Input
                    value={inputs.address.city}
                    onChange={({ target }) => setInputs((prev) => ({ ...prev, address: { ...prev.address, city: target.value } }))}
                    placeholder='City'
                />

                <Input
                    value={inputs.address.street}
                    onChange={({ target }) => setInputs((prev) => ({ ...prev, address: { ...prev.address, street: target.value } }))}
                    placeholder='Street or Locality'
                />

                <Select
                    value={inputs.status}
                    onChange={({ target }) => setInputs((prev) => ({ ...prev, status: target.value }))}
                >
                    <option value="active"> Active </option>
                    <option value="inactive"> Inactive </option>
                </Select>

            </SimpleGrid>

            {defaultValue ? (
                <Button isLoading={isLoading} my={4} w={['100%', '100%', '100%', 600]} onClick={onUpdate}> Save </Button>
            ) : (
                <Button isLoading={isLoading} my={4} w={['100%', '100%', '100%', 600]} onClick={onAdd}> Add </Button>
            )}

        </VStack>
    )
}

export { WarehouseInputForm }
