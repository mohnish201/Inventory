import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Controller } from "../../components/Controller";
import {
  Stack,
  Table,
  Th,
  Td,
  Tr,
  Thead,
  Tbody,
  Button,
} from "@chakra-ui/react";
import { Loading } from "../../components/Loading";
import { useSearchParams } from "../../hooks/useSearchParams.hook";
import { getWarehouses } from "../../actions/warehouse.action";
import { MdEditNote } from "react-icons/md";

import { WarehouseDeleteButton } from "../../components/WarehouseDeleteButton";
import { Unauthorized } from "../../components/Unauthorized";

const Warehouses = () => {
  const { page = 1 } = useSearchParams();
  const [pageEnd, setPageEnd] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);

  const load = async () => {
    setLoading(true);

    try {
      let { data, pageEnd } = await getWarehouses(page, limit);
      setData(data);
      setPageEnd(pageEnd);
    } catch (error) {
      setData(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoading) return <Loading />;

  if (!data) {
    return <Unauthorized />;
  }

  return (
    <Stack>
      <Controller
        heading={"Warehouses"}
        pageProps={{ page, pageEnd }}
        insertion={{
          text: "New Warehouse",
          path: "/settings/organisation/warehouses/create",
        }}
      />

      <Table mt={20}>
        <Thead>
          <Tr>
            <Th> Name </Th>
            <Th> Phone </Th>
            <Th> Country </Th>
            <Th> Pincode </Th>
            <Th> City </Th>
            <Th> Edit </Th>
            <Th> Delete </Th>
          </Tr>
        </Thead>

        <Tbody>
          {data.map(
            ({
              _id,
              warehouseName,
              phone,
              address: { country, zipCode, city },
            }) => (
              <Tr key={_id}>
                <Td> {warehouseName} </Td>
                <Td> {phone} </Td>
                <Td> {country} </Td>
                <Td> {zipCode} </Td>
                <Td> {city} </Td>
                <Td>
                  <Link to={`/settings/organisation/warehouses/edit/${_id}`}>
                    <Button variant={"outline"}>
                      {" "}
                      <MdEditNote />{" "}
                    </Button>
                  </Link>
                </Td>

                <Td>
                  <WarehouseDeleteButton id={_id} reload={load} />
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </Stack>
  );
};

export default Warehouses;
