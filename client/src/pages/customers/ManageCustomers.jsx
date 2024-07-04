import { Link } from "react-router-dom";
import { useState } from "react";
import { Controller } from "../../components/Controller";
import { Loading } from "../../components/Loading";
import { useEffect } from "react";
import { getCustomers } from "../../actions/customer.action";

import {
  Stack,
  Button,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useSearchParams } from "../../hooks/useSearchParams.hook";
import { useFormat } from "../../hooks/useFormat.hook";
import { MdEditNote } from "react-icons/md";
import { CustomerDeleteButton } from "../../components/CustomerDeleteButton";
import { Unauthorized } from "../../components/Unauthorized";

const ManageCustomers = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { page = 1 } = useSearchParams();
  const [pageEnd, setPageEnd] = useState(1);
  const [limit, setLimit] = useState(10);

  const { format } = useFormat();

  const load = async () => {
    setLoading(true);

    try {
      let { data, pageEnd } = await getCustomers(page, limit);
      setData(data);
      setPageEnd(pageEnd);
    } catch (_) {
      setData(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [page]);

  if (isLoading) return <Loading />;

  if (!data) return <Unauthorized />;

  return (
    <Stack>
      <Controller
        heading={"Customers"}
        pageProps={{ page, pageEnd }}
        insertion={{ text: "New Customer", path: "/sales/customers/create" }}
      />

      <TableContainer>
        <Table variant="striped" colorScheme="gray" mt={{ base: 150, sm: 100 }}>
          <Thead>
            <Tr>
              <Th> Name </Th>
              <Th> Email </Th>
              <Th> Mobile No. </Th>
              <Th> PAN </Th>
              <Th> Created On </Th>
              <Th> Edit </Th>
              <Th> Delete </Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map(
              ({
                _id,
                salutation,
                firstName,
                lastName,
                email,
                mobileNo,
                PAN,
                createdAt,
              }) => (
                <Tr key={_id}>
                  <Td>
                    {" "}
                    {salutation}. {firstName} {lastName}{" "}
                  </Td>
                  <Td> {email} </Td>
                  <Td> {mobileNo} </Td>
                  <Td> {PAN} </Td>
                  <Td> {format(createdAt)} </Td>
                  <Td>
                    <Link to={`manage/${_id}`}>
                      {" "}
                      <Button size={"sm"} colorScheme="blue" variant="outline">
                        {" "}
                        <MdEditNote />{" "}
                      </Button>{" "}
                    </Link>
                  </Td>

                  <Td>
                    <CustomerDeleteButton id={_id} reload={load} />
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default ManageCustomers;
