import {
  Stack,
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  Tr,
  Button,
  TableContainer,
} from "@chakra-ui/react";
import { Controller } from "../../components/Controller";
import { useState, useEffect } from "react";
import { useSearchParams } from "../../hooks/useSearchParams.hook";
import { useFormat } from "../../hooks/useFormat.hook";

import { Loading } from "../../components/Loading";
import { Link } from "react-router-dom";

import { MdEditNote } from "react-icons/md";
import { CategoryDeleteButton } from "../../components/CategoryDeleteButton";
import { getCategories } from "../../actions/category.action";
import { Unauthorized } from "../../components/Unauthorized";

const ManageCategory = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);

  const { page = 1 } = useSearchParams();
  const [pageEnd, setPageEnd] = useState(1);

  const { format } = useFormat();

  const load = async () => {
    setLoading(true);

    try {
      let { data, pageEnd } = await getCategories(page, limit);
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
        heading={"Categories"}
        pageProps={{ page, pageEnd }}
        insertion={{
          path: "/settings/categories/create",
          text: "New Category",
        }}
      />

      <TableContainer>
        <Table variant="striped" colorScheme="gray" mt={{ base: 150, sm: 100 }}>
          <Thead>
            <Tr>
              <Th> Name </Th>
              <Th> Created At </Th>
              <Th> Updated At </Th>
              <Th> Edit </Th>
              <Th> Delete </Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map(({ _id, categoryName, createdAt, updatedAt }) => (
              <Tr key={_id}>
                <Td> {categoryName} </Td>
                <Td> {format(createdAt)} </Td>
                <Td> {format(updatedAt)} </Td>
                <Td>
                  {" "}
                  <Link to={_id}>
                    {" "}
                    <Button size={"sm"} colorScheme="blue" variant={"outline"}>
                      {" "}
                      <MdEditNote />{" "}
                    </Button>{" "}
                  </Link>{" "}
                </Td>
                <Td>
                  {" "}
                  <CategoryDeleteButton id={_id} reload={load} />{" "}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default ManageCategory;
