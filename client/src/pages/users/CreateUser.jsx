import {
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Button,
    Text,
    SimpleGrid,
    VStack
} from '@chakra-ui/react';

import { Loading } from '../../components/Loading';
import { useEffect, useState } from 'react';
import { getRoles } from '../../actions/role.actions';
import { inviteUser } from '../../actions/users.actions';

import { BsEye, BsEyeSlash } from "react-icons/bs";
import toast from 'react-hot-toast';


const CreateUser = () => {

    const [isLoading, setLoading] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [roles, setRoles] = useState([]);
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const onInviteUser = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        setSubmitting(true);

        try {
            await inviteUser(formData);
            e.target.reset();
            toast.success('User Invited');
        } catch (error) {
            toast.error(error.message);
        }

        setSubmitting(false);

    }

    useEffect(() => {

        let getAllRoles = async () => {

            setLoading(true);

            try {
                let data = await getRoles();
                setRoles(data);
            } catch (_) {
                console.log(_);
            }

            setLoading(false);

        }

        getAllRoles();

    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <VStack>
            <form onSubmit={onInviteUser}>
                <SimpleGrid w={['96vw', 400, 400, 400]} gap={2}>
                    <Text fontSize={22} fontWeight={500} my={4} textAlign={'center'}> Invite User </Text>
                    <Input type='text' placeholder='Name' name='name' required />
                    <Input type='email' placeholder='Email' name='email' required />
                    <Select name='roleId' required>
                        <option value=""> Select Role </option>
                        {roles.map(({ _id, roleName }) => (
                            <option value={_id} key={_id} > {roleName} </option>
                        ))}
                    </Select>
                    <InputGroup>
                        <Input type={isPasswordVisible ? 'text' : 'password'} placeholder='Password' name='password' required />
                        <InputRightElement cursor={'pointer'} onClick={() => setPasswordVisible((prev) => !prev)}>
                            {isPasswordVisible ? (
                                <BsEye />
                            ) : (
                                <BsEyeSlash />
                            )}

                        </InputRightElement>
                    </InputGroup>

                    <Button type='submit' isLoading={isSubmitting}> Invite </Button>
                </SimpleGrid>
            </form>
        </VStack>
    )
}

export default CreateUser;
