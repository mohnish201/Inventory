import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getUsers } from "../../actions/users.actions";
import { Loading } from "../../components/Loading";
import { Controller } from "../../components/Controller";
import { UserTableRow } from "../../components/UserTableRow";
import {
  Stack,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
} from "@chakra-ui/react";
import { useSearchParams } from "../../hooks/useSearchParams.hook";
import { Unauthorized } from "../../components/Unauthorized";

const ManageUsers = () => {
  const { page = 1 } = useSearchParams();
  const [pageEnd, setPageEnd] = useState(1);

  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getAllUsers = async () => {
    setLoading(true);

    try {
      let { data, pageEnd } = await getUsers(page);
      setUsers(data);
      setPageEnd(pageEnd);
    } catch (_) {
      setUsers(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, [page]);

  if (isLoading) return <Loading />;

  if (!users) return <Unauthorized />;

  return (
    <Stack>
      <Controller
        heading={"Users"}
        pageProps={{ page, pageEnd }}
        insertion={{ text: "Invite User", path: "/settings/users/invite" }}
      />

      <TableContainer mt={{ base: 150, sm: 100 }}>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th> Name </Th>
              <Th> Email </Th>
              <Th> Role </Th>
              <Th> Created On </Th>
              <Th> Edit </Th>
              <Th> Delete </Th>
            </Tr>
          </Thead>

          <Tbody>
            {users.map((user) => (
              <UserTableRow key={user._id} data={user} reload={getAllUsers} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default ManageUsers;
