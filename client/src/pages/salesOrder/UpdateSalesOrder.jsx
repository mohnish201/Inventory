import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { SalesOrderInputForm } from "../../components/SalesOrderInputForm";
import { getSalesOrderById } from "../../actions/salesOrder.action";

const UpdateSalesOrder = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        let data = await getSalesOrderById(id);
        setData(data);
        console.log(data);
      } catch (_) {}

      setLoading(false);
    };

    load();
  }, []);

  if (isLoading) return <Loading />;

  return <SalesOrderInputForm defaultValue={data} />;
};

export default UpdateSalesOrder;
