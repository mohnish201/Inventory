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
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Controller } from "../../components/Controller";
import { useFormat } from "../../hooks/useFormat.hook";
import { useSearchParams } from "../../hooks/useSearchParams.hook";
import { getPurchaseOrder } from "../../actions/purchaseOrder.action";
import PurchaseOrderDeleteButton from "../../components/PurchaseOrderDeleteButton";
import { Link } from "react-router-dom";
import { MdEditNote } from "react-icons/md";
import { Loading } from "../../components/Loading";
import { OrganizationContextProvider } from "../../providers/ContextProvider";
import { useCurrencyFormat } from "../../hooks/useCurrrencyFormat";

const ManagePurchaseOrder = () => {
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

    try {
      let { data, pageEnd } = await getPurchaseOrder(page, limit);
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
        heading={"Purchase Order"}
        pageProps={{ page, pageEnd }}
        insertion={{
          path: "/purchase/orders/create",
          text: "New Order",
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
              <Th> Purchase Order </Th>
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
                purchaseOrderDate,
                reference,
                total,
                purchaseOrderNo,
                createdAt,
              }) => (
                <Tr key={_id}>
                  <Td maxW={200}> {purchaseOrderDate} </Td>
                  <Td maxW={200} color={"blue"} fontWeight={500}>
                    PO-{purchaseOrderNo}
                  </Td>
                  {/* <Td maxW={200} overflow={"hidden"} textOverflow={"ellipsis"}>
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
                    <PurchaseOrderDeleteButton id={_id} reload={load} />
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

export default ManagePurchaseOrder;
