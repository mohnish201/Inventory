import { useState, useEffect } from 'react';
import { useFormat } from '../hooks/useFormat.hook';

import { MdEditNote } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { getRoles } from '../actions/role.actions';
import { updateUser, deleteUser } from '../actions/users.actions';

import {
    Tr, Td,
    Button,
    SimpleGrid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input, Select,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react';

import { toast } from 'react-hot-toast';

const UserTableRow = ({ data: { _id, name, email, roleDetails, createdAt }, reload }) => {

    const alert = useDisclosure();
    const { format } = useFormat();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isLoading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);

    const onUpdateUser = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        setLoading(true);

        try {
            await updateUser(formData, _id);
            toast.success('User Updated');
            onClose();
            reload();
        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);
    }

    const onDeleteUser = async () => {

        setLoading(true);

        try {
            await deleteUser(_id);
            toast.success('Deleted');
            alert.onClose();
            reload();
        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);
    }


    useEffect(() => {

        let getAllRoles = async () => {

            try {
                let data = await getRoles();
                setRoles(data);
            } catch (_) {
                console.log(_);
            }

        }

        getAllRoles();

    }, [])

    return (
        <Tr>
            <Td> {name} </Td>
            <Td> {email} </Td>
            <Td> {roleDetails.roleName} </Td>
            <Td> {format(createdAt)} </Td>
            <Td>
                <Button variant={'outline'} colorScheme='gray' onClick={onOpen}> <MdEditNote fontSize={20} /> </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader> Update User </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form onSubmit={onUpdateUser}>
                                <SimpleGrid gap={2}>
                                    <Input defaultValue={name} type='text' placeholder='Name' name='name' required />
                                    <Input defaultValue={email} type='email' placeholder='Email' name='email' required />
                                    <Select defaultValue={roleDetails._id} name='roleId' required>
                                        <option value=""> Select Role </option>
                                        {roles.map(({ _id, roleName }) => (
                                            <option value={_id} key={_id} > {roleName} </option>
                                        ))}
                                    </Select>
                                    <Button type='submit' isLoading={isLoading} _hover={'none'}> Update </Button>
                                </SimpleGrid>
                            </form>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Td>
            <Td>
                <Button variant={'outline'} colorScheme='red' onClick={alert.onOpen}> <MdDeleteOutline fontSize={20} /> </Button>
                <AlertDialog
                    isOpen={alert.isOpen}
                    onClose={alert.onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Delete User
                            </AlertDialogHeader>

                            <AlertDialogCloseButton />

                            <AlertDialogBody>
                                Are you sure? You can't undo this action afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button _hover={'none'} isLoading={isLoading} colorScheme='red' variant={'outline'} onClick={onDeleteUser}>
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Td>
        </Tr>
    )
}

export { UserTableRow }
