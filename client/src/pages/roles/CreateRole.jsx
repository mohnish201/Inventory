import { Loading } from "../../components/Loading";
import { Stack, Flex, Text, Input, Textarea, Button } from "@chakra-ui/react";
import { RoleAccessController } from "../../components/RoleAccessController";
import { config } from "../../configs/roles.config";
import { useState } from "react";
import { addRole } from "../../actions/role.actions";
import { toast } from "react-hot-toast";

const CreateRole = () => {

    const [roleName, setRoleName] = useState('');
    const [roleDescription, setRoleDescription] = useState('');
    const [roleAccess, setRoleAccess] = useState(config);

    const [isLoading, setLoading] = useState(false);

    const onAddRole = async () => {

        const payload = {
            roleName,
            roleDescription,
            roleAccess
        }

        if (!roleName) {
            toast.error('Role Name not provided');
            return;
        }

        if (!roleDescription) {
            toast.error('Role Description not provided');
            return;
        }

        setLoading(true);

        try {
            await addRole(payload);
            setRoleName('');
            setRoleDescription('');
            setRoleAccess(config);
            toast.success('Added');
        } catch (error) {
            toast.error(error.message);
        }

        setLoading(false);
    }

    const handleRoleChange = (value, index) => {
        const newState = [...roleAccess];
        newState[index] = value;
        setRoleAccess(newState);
    }

    if (isLoading) {
        return <Loading />
    }


    return (
        <Stack p={4}>
            <Stack spacing={6}>
                <Flex gap={4}>
                    <Text whiteSpace={'nowrap'} _after={{ content: `'*'`, color: 'red' }}> Role Name </Text>
                    <Input
                        value={roleName}
                        placeholder="Role Name"
                        w={300}
                        onChange={(e) => setRoleName(e.target.value)}
                    />
                </Flex>

                <Flex gap={4}>
                    <Text whiteSpace={'nowrap'} _after={{ content: `'*'`, color: 'red' }}> Description </Text>
                    <Textarea
                        value={roleDescription}
                        placeholder="Role Description"
                        w={300}
                        onChange={(e) => setRoleDescription(e.target.value)}
                    />
                </Flex>

                {config?.map((item, index) => (
                    <RoleAccessController data={item} key={item.heading + index} onChange={(value) => handleRoleChange(value)} />
                ))}
            </Stack>

            <Button onClick={onAddRole} > Add </Button>
        </Stack>
    )
}

export default CreateRole;
