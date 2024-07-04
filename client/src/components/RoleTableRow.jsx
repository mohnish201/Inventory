import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Tr, Td, Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure
} from "@chakra-ui/react";
import { MdEditNote } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { deleteRole } from "../actions/role.actions";
import toast from "react-hot-toast";

const RoleTableRow = ({ data: { _id, roleName, roleDescription }, reload }) => {

    const [isLoading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onDeleteRole = async () => {

        setLoading(true);

        try {
            await deleteRole(_id);
            onClose();
            reload();
            toast.success('Deleted');
        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);
    }

    return (
        <Tr>
            <Td w={52}> {roleName} </Td>
            <Td> {roleDescription} </Td>
            <Td w={22}>
                <Link to={`/settings/roles/manage/${_id}`}>
                    <Button size={'sm'} variant={'outline'}> <MdEditNote /> </Button>
                </Link>
            </Td>
            <Td w={22}>
                <Button size={'sm'} variant={'outline'} colorScheme="red" onClick={onOpen}> <MdDeleteOutline /> </Button>
                <AlertDialog
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Delete Role
                            </AlertDialogHeader>

                            <AlertDialogCloseButton />

                            <AlertDialogBody>
                                Are you sure? You can't undo this action afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button _hover={'none'} isLoading={isLoading} colorScheme='red' variant={'outline'} onClick={onDeleteRole}>
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

export { RoleTableRow }
