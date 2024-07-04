import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Controller } from "../../components/Controller";
import {
  Stack,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
} from "@chakra-ui/react";
import { getAllCurrency } from "../../actions/currency.action";
import { Loading } from "../../components/Loading";
import { useFormat } from "../../hooks/useFormat.hook";
import { CurrencyDeleteButton } from "../../components/CurrencyDeleteButton";
import { MdEditNote } from "react-icons/md";
import { Unauthorized } from "../../components/Unauthorized";
import { useSearchParams } from "../../hooks/useSearchParams.hook";

const ManageCurrency = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { page = 1 } = useSearchParams();
  const [pageEnd, setPageEnd] = useState(1);
  const [limit, setLimit] = useState(10);
  const { format } = useFormat();

  const load = async () => {
    setLoading(true);

    try {
      let { data, pageEnd } = await getAllCurrency(page, limit);
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

  if (!data) {
    return <Unauthorized />;
  }

  return (
    <Stack>
      <Controller
        heading={"Currencies"}
        pageProps={{ page, pageEnd }}
        insertion={{
          text: "New Currency",
          path: "/settings/organisation/currencies/create",
        }}
      />

      <TableContainer>
        <Table variant="striped" colorScheme="gray" mt={{ base: 150, sm: 100 }}>
          <Thead>
            <Tr>
              <Th> Name </Th>
              <Th> Code </Th>
              <Th> Symbol </Th>
              <Th> Added On </Th>
              <Th> Edit </Th>
              <Th> Delete </Th>
            </Tr>
          </Thead>

          <Tbody>
            {data?.map(
              ({
                _id,
                currencyName,
                currencyCode,
                currencySymbol,
                createdAt,
              }) => (
                <Tr key={_id}>
                  <Td> {currencyName} </Td>
                  <Td color={"brand.accent"}> {currencyCode} </Td>
                  <Td> {currencySymbol} </Td>
                  <Td> {format(createdAt)} </Td>
                  <Td>
                    <Link to={_id}>
                      <Button
                        colorScheme="blue"
                        size={"sm"}
                        variant={"outline"}
                      >
                        {" "}
                        <MdEditNote fontSize={16} />{" "}
                      </Button>
                    </Link>
                  </Td>
                  <Td>
                    <CurrencyDeleteButton id={_id} reload={load} />
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

export default ManageCurrency;
