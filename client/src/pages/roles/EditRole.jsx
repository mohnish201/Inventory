import { Loading } from "../../components/Loading";
import { Stack, Flex, Text, Input, Textarea, Button } from "@chakra-ui/react";
import { RoleAccessController } from "../../components/RoleAccessController";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoleById, updateRole } from "../../actions/role.actions";
import { toast } from "react-hot-toast";
import { config } from "../../configs/roles.config";

const EditRole = () => {

    const { id } = useParams();
    const [roleName, setRoleName] = useState('');
    const [roleDescription, setRoleDescription] = useState('');
    const [roleAccess, setRoleAccess] = useState(config);

    const [isLoading, setLoading] = useState(true);

    const loadRole = async () => {

        setLoading(true);

        try {
            let data = await getRoleById(id);

            setRoleName(data.roleName);
            setRoleDescription(data.roleDescription);
            setRoleAccess(data.roleAccess);
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    const onUpdateRole = async () => {

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

        try {
            await updateRole(payload, id);
            toast.success('Updated');
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

    useEffect(() => {
        loadRole();
    }, [])

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

                {roleAccess?.map((item, index) => (
                    <RoleAccessController data={item} key={item.heading + index} onChange={(value) => handleRoleChange(value)} />
                ))}
            </Stack>

            <Button onClick={onUpdateRole} > Save </Button>
        </Stack>
    )
}

export default EditRole;
