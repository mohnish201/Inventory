import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPuchaseOrderById } from "../../actions/purchaseOrder.action";
import { Loading } from "../../components/Loading";
import { PurchaseOrderInputForm } from "../../components/PurchaseOrderInputForm";

const UpdatePurchaseOrder = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        let data = await getPuchaseOrderById(id);
        setData(data);
      } catch (_) {}

      setLoading(false);
    };

    load();
  }, []);

  if (isLoading) return <Loading />;
  return <PurchaseOrderInputForm defaultValue={data} />;
};

export default UpdatePurchaseOrder;
