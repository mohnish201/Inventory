import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemInputForm } from "../../components/ItemInputForm";
import { getItemById } from "../../actions/item.action";
import { Loading } from "../../components/Loading";
import { getSalesOrderById } from "../../actions/salesOrder.action";
import SalesOrderInputForm from "../../components/SalesOrderInputForm";

const UpdateItem = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        let data = await getItemById(id);
        setData(data);
        console.log(data);
      } catch (_) {}

      setLoading(false);
    };

    load();
  }, []);

  if (isLoading) return <Loading />;

  return <ItemInputForm defaultValue={data} />;
};

export default UpdateItem;
