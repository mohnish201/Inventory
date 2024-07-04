import { Text, VStack } from "@chakra-ui/react";
import { WarehouseInputForm } from "../../components/WarehouseInputForm";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { useEffect, useState } from "react";
import { getWarehouseById } from "../../actions/warehouse.action";

const EditWarehouse = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getWarehouse = async () => {
      try {
        let data = await getWarehouseById(id);
        setData(data);
      } catch (error) {
        setData(null);
      }

      setLoading(false);
    };

    getWarehouse();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <VStack>
      {data ? (
        <WarehouseInputForm defaultValue={data} />
      ) : (
        <Text my={6}> Not Found </Text>
      )}
    </VStack>
  );
};

export default EditWarehouse;
