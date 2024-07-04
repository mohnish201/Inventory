import {
    Box,
    HStack,
    Text,
    Stack,
    Button,
    Input,
    useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';

import { MdDelete } from "react-icons/md";
import { MdOutlineEditNote } from "react-icons/md";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { GoIssueClosed } from "react-icons/go";

import { updateBrand, deleteBrand } from '../actions/brand.actions';
import { useRef, useState } from 'react';

import { toast } from 'react-hot-toast';


const BrandCard = ({ data: { _id, brandName }, reload }) => {

    const inputRef = useRef(null);
    const [isLoading, setLoading] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const deleteItem = async () => {

        setLoading(true);

        try {
            await deleteBrand(_id);
            onClose();
            toast.success('Deleted');
            reload();
        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);
    }

    const updateItem = async () => {
        let { value } = inputRef.current;

        if (!value) {
            toast.error('Brand name not provided');
            return;
        }

        setLoading(true)

        try {
            await updateBrand(_id, value);
            toast.success('Update');
            reload();
        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);
    }

    return (
        <Box
            bg={'white'}
            border={'1px solid #f2f2f2'}
            rounded={'lg'}
        >
            <Stack
                textAlign={'center'}
                p={6}
                color={'gray.800'}
                align={'center'}>

                {isEditMode ? (
                    <Input ref={inputRef} defaultValue={brandName} placeholder='Brand Name' />
                ) : (
                    <Text fontSize={'2xl'} fontWeight={700}>
                        {brandName}
                    </Text>
                )}

            </Stack>

            <HStack bg={'gray.50'} p={6} >

                <Button
                    w={'full'}
                    bg={'gray.400'}
                    _hover={{ bg: 'gray.400' }}
                    color={'white'}
                    colorScheme='gray'
                    rounded={'full'}
                    onClick={() => setEditMode((prev) => !prev)}
                >
                    {isEditMode ? (
                        <AiOutlineCloseCircle />
                    ) : (
                        <MdOutlineEditNote />
                    )}
                </Button>

                {isEditMode ? (
                    <Button
                        onClick={updateItem}
                        w={'full'}
                        bg={'red.500'}
                        colorScheme={'red'}
                        color={'white'}
                        rounded={'full'}
                        isLoading={isLoading}
                    >
                        <GoIssueClosed />
                    </Button>
                ) : (
                    <Button
                        onClick={onOpen}
                        w={'full'}
                        bg={'red.500'}
                        colorScheme={'red'}
                        color={'white'}
                        rounded={'full'}
                    >
                        <MdDelete />
                    </Button>
                )}



                <AlertDialog
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Delete Customer
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure? You can't undo this action afterwards.
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    isLoading={isLoading}
                                    colorScheme='red'
                                    bg={'red'} ml={3}
                                    onClick={deleteItem}
                                >
                                    Delete
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </HStack>
        </Box>
    )
}

export { BrandCard }