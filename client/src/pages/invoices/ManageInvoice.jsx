import React, { useContext, useEffect, useMemo, useState } from "react";
import { Loading } from "../../components/Loading";
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
import { useFormat } from "../../hooks/useFormat.hook";
import { useSearchParams } from "../../hooks/useSearchParams.hook";
import { getInvoice } from "../../actions/invoice.action";
import { Link } from "react-router-dom";
import { MdEditNote } from "react-icons/md";
import { InvoiceDeleteButton } from "../../components/InvoiceDeleteButton";
import { OrganizationContextProvider } from "../../providers/ContextProvider";
import { useCurrencyFormat } from "../../hooks/useCurrrencyFormat";

const ManageInvoice = () => {
  const [data, setData] = useState([]);
  const [pageEnd, setPageEnd] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const { organizationData } = useContext(OrganizationContextProvider);

  const { formatCurrency } = useCurrencyFormat();

  const { format } = useFormat();
  const { page = 1 } = useSearchParams();

  const load = async () => {
    setLoading(true);

    try {
      let { data, pageEnd } = await getInvoice(page, limit);
      setData(data);
      setPageEnd(pageEnd);
    } catch (_) {}

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [page]);

  if (isLoading) return <Loading />;
  return (
    <Stack>
      <Controller
        heading={"Invoices"}
        pageProps={{ page, pageEnd }}
        insertion={{
          path: "/sales/invoices/create",
          text: "New Invoice",
        }}
      />
      <TableContainer>
        <Table
          variant="striped"
          colorScheme="gray"
          mt={{ base: 150, sm: 100 }}
          whiteSpace={"nowrap"}
        >
          <Thead>
            <Tr>
              <Th>Order Date </Th>
              <Th> Invoice No </Th>
              {/* <Th> Reference </Th> */}
              <Th> Total Amount </Th>
              <Th> Status </Th>
              <Th>Created At</Th>
              <Th>View / Edit </Th>
              <Th> Delete </Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map(
              ({
                _id,
                invoiceDate,
                reference,
                total,
                invoiceNo,
                createdAt,
              }) => (
                <Tr key={_id}>
                  <Td maxW={200}> {invoiceDate} </Td>
                  <Td maxW={200} color={"blue"} fontWeight={500}>
                    INV-{invoiceNo}
                  </Td>
                  {/* <Td maxW={200} textOverflow={"ellipsis"} overflow={"hidden"}>
                    {reference}
                  </Td> */}
                  <Td maxW={200} fontWeight={500}>
                    {formatCurrency(total || 0)}
                  </Td>
                  <Td maxW={200}> {"Pending"} </Td>
                  <Td maxW={200}> {format(createdAt)} </Td>
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
                    <InvoiceDeleteButton id={_id} reload={load} />
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

export default ManageInvoice;
