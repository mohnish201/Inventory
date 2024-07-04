import { Link } from "react-router-dom";
import { useState } from "react";
import { Controller } from "../../components/Controller";
import { Loading } from "../../components/Loading";
import { useEffect } from "react";
import { getVendors } from "../../actions/vendor.action";

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
import { VendorDeleteButton } from "../../components/VendorDeleteButton";
import { Unauthorized } from "../../components/Unauthorized";

const ManageVendors = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { page = 1 } = useSearchParams();
  const [pageEnd, setPageEnd] = useState(1);
  const [limit, setLimit] = useState(10);

  const { format } = useFormat();

  const load = async () => {
    setLoading(true);

    try {
      let { data, pageEnd } = await getVendors(page, limit);
      setData(data);
      setPageEnd(pageEnd);
    } catch (_) {
      setData(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoading) return <Loading />;

  if (!data) return <Unauthorized />;

  return (
    <Stack>
      <Controller
        heading={"Vendors"}
        pageProps={{ page, pageEnd }}
        insertion={{ text: "New Vendor", path: "/purchase/vendors/create" }}
      />

      <TableContainer mt={{ base: 150, sm: 100 }}>
        <Table variant="striped" colorScheme="gray">
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
                    <VendorDeleteButton id={_id} reload={load} />
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

export default ManageVendors;
