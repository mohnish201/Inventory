import { useEffect, useState } from "react";
import {
    Text,
    Table,
    Thead,
    Tbody,
    Tr, Th, Td,
    TableContainer,
    Checkbox,
    CheckboxGroup,
} from '@chakra-ui/react';

const RoleAccessController = ({ data, onChange }) => {

    const [state, setState] = useState(data);

    const onAccessChange = (value, index) => {
        const newState = { ...data }
        newState.types[index].access = value;
        setState(newState);
    }

    const onProvideAllAccess = (value, index) => {
        const newState = { ...data }

        if (value) {
            newState.types[index].access = ['create', 'view', 'edit', 'delete']
        } else {
            newState.types[index].access = [];
        }

        setState(newState);
    }

    useEffect(() => {
        if (typeof onChange === 'function') {
            onChange(state);
        }
    }, [state])

    return (
        <TableContainer border={'1px solid #f2f2f2'} p={4} borderRadius={6}>
            <Text fontSize={22} fontWeight={500} my={2}> {state.heading} </Text>
            <Table variant='simple' fontSize={15}>
                <Thead>
                    <Tr>
                        <Th w={'50%'}>  </Th>
                        <Th> Full Access </Th>
                        <Th> Create </Th>
                        <Th> View </Th>
                        <Th> Edit </Th>
                        <Th> Delete </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {state?.types?.map(({ name, access }, index) => (
                        <Tr key={name + index}>
                            <Td> {name} </Td>
                            <Td>
                                <Checkbox
                                    isChecked={access.length === 4 ? true : false}
                                    onChange={(e) => { onProvideAllAccess(e.target.checked, index) }}
                                />
                            </Td>
                            <CheckboxGroup key={access} defaultValue={access} onChange={(value) => onAccessChange(value, index)}>
                                <Td> <Checkbox value={'create'} /> </Td>
                                <Td> <Checkbox value={'view'} /> </Td>
                                <Td> <Checkbox value={'edit'} /> </Td>
                                <Td> <Checkbox value={'delete'} /> </Td>
                            </CheckboxGroup>
                        </Tr>
                    ))}
                </Tbody>

            </Table>
        </TableContainer>
    )
}

export { RoleAccessController }
