import { useEffect, useState } from "react";
import { getRoles } from "../../actions/role.actions";
import { toast } from 'react-hot-toast';
import { Controller } from "../../components/Controller";
import {
    Stack,
    TableContainer, Table, Thead, Tbody, Tr, Th
} from '@chakra-ui/react';

import { RoleTableRow } from "../../components/RoleTableRow";
import { Loading } from '../../components/Loading';
import { Unauthorized } from "../../components/Unauthorized";

const ManageRoles = () => {

    const [roles, setRoles] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getAllRoles = async () => {

        setLoading(true);

        try {
            let data = await getRoles();
            setRoles(data);
        } catch (error) {
            setRoles(null);
        }

        setLoading(false);
    }

    useEffect(() => {
        getAllRoles();
    }, [])

    if (isLoading) return <Loading />

    if (!roles) return <Unauthorized />

    return (
        <Stack>
            <Controller heading={'Roles'} />
            <TableContainer mt={20}>
                <Table size={'sm'}>
                    <Thead>
                        <Tr>
                            <Th> Role Name </Th>
                            <Th> Role Description </Th>
                            <Th> Edit </Th>
                            <Th> Delete </Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {roles.map((role) => (
                            <RoleTableRow key={role._id} data={role} reload={getAllRoles} />
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Stack>
    )
}

export default ManageRoles;
