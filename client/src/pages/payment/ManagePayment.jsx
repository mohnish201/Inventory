import React, { useContext, useMemo, useState } from "react";
import { Loading } from "../../components/Loading";
import { useFormat } from "../../hooks/useFormat.hook";
import { useSearchParams } from "../../hooks/useSearchParams.hook";
import { OrganizationContextProvider } from "../../providers/ContextProvider";
import {
  Button,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Controller } from "../../components/Controller";
import { Link } from "react-router-dom";
import { MdEditNote } from "react-icons/md";
import { useCurrencyFormat } from "../../hooks/useCurrrencyFormat";

const ManagePayment = () => {
  const [data, setData] = useState([]);
  const [pageEnd, setPageEnd] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const { organizationData } = useContext(OrganizationContextProvider);

  const { format } = useFormat();
  const { page = 1 } = useSearchParams();

  const { formatCurrency } = useCurrencyFormat();
  const load = async () => {
    setLoading(true);

    // try {
    //   let { data, pageEnd } = await getSalesOrder(page, limit);
    //   setData(data);
    //   setPageEnd(pageEnd);
    // } catch (_) {}

    setLoading(false);
  };

  //   useEffect(() => {
  //     load();
  //   }, [page]);

  if (isLoading) return <Loading />;
  return (
    <Stack>
      <Controller
        heading={"Record Payment"}
        pageProps={{ page, pageEnd }}
        insertion={{
          path: "/sales/payments/record",
          text: "New Payment",
        }}
      />

      <TableContainer>
        <Table
          colorScheme="gray"
          mt={{ base: 150, sm: 100 }}
          whiteSpace={"nowrap"}
          variant="striped"
        >
          <Thead>
            <Tr>
              <Th>Date </Th>
              <Th> Payment # </Th>
              <Th> Type </Th>
              <Th> Reference NO. </Th>
              <Th> Customer Name </Th>
              <Th>Invoice</Th>
              <Th>Amount</Th>
              <Th>View / Edit </Th>
              <Th> Delete </Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map(
              ({
                _id,
                salesOrderDate,
                reference,
                total,
                salesOrderNo,
                createdAt,
              }) => (
                <Tr key={_id}>
                  <Td> {salesOrderDate} </Td>
                  <Td color={"blue"} fontWeight={500}>
                    SO-{salesOrderNo}{" "}
                  </Td>
                  {/* <Td> {reference} </Td> */}
                  <Td fontWeight={500}>{formatCurrency(total || 0)}</Td>
                  <Td> {"Pending"} </Td>
                  <Td> {format(createdAt)} </Td>
                  <Td textAlign={"center"}>
                    <Link to={`manage/${_id}`}>
                      <Button
                        size={"sm"}
                        colorScheme="blue"
                        variant={"outline"}
                      >
                        <MdEditNote fontSize={16} />
                      </Button>
                    </Link>
                  </Td>

                  <Td textAlign={"center"}>
                    {/* <SalesOrderDeleteButton id={_id} reload={load} /> */}
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

export default ManagePayment;
