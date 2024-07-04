import { Link } from "react-router-dom";
import { getItems } from "../../actions/item.action";
import { useEffect, useState } from "react";
import { useSearchParams } from "../../hooks/useSearchParams.hook";
import { Loading } from "../../components/Loading";
import { Controller } from "../../components/Controller";
import { useFormat } from "../../hooks/useFormat.hook";
import { MdEditNote } from "react-icons/md";
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
import { ItemDeleteButton } from "../../components/ItemDeleteButton";

const ManageItems = () => {
  const [data, setData] = useState([]);
  const [pageEnd, setPageEnd] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);

  const { format } = useFormat();
  const { page = 1 } = useSearchParams();

  const load = async () => {
    setLoading(true);

    try {
      let { data, pageEnd } = await getItems(page, limit);
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
        heading={"Items"}
        pageProps={{ page, pageEnd }}
        insertion={{ path: "create", text: "New Item" }}
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
              <Th> name </Th>
              <Th> Type </Th>
              <Th> Unit </Th>
              <Th> Current Stock </Th>
              <Th> Reorder Point </Th>
              <Th> Created At </Th>
              <Th> Edit </Th>
              <Th> Delete </Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map(
              ({
                _id,
                name,
                types,
                unit,
                currentStock,
                reorderPoint,
                createdAt,
              }) => (
                <Tr key={_id}>
                  <Td> {name} </Td>
                  <Td> {types} </Td>
                  <Td> {unit} </Td>
                  <Td> {currentStock || 0} </Td>
                  <Td> {reorderPoint || 0} </Td>
                  <Td> {format(createdAt)} </Td>
                  <Td>
                    <Link to={`manage/${_id}`}>
                      <Button
                        size={"sm"}
                        colorScheme="blue"
                        variant={"outline"}
                      >
                        {" "}
                        <MdEditNote fontSize={16} />{" "}
                      </Button>
                    </Link>
                  </Td>

                  <Td>
                    <ItemDeleteButton id={_id} reload={load} />
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

export default ManageItems;
