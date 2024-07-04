import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoiceById } from "../../actions/invoice.action";
import { Loading } from "../../components/Loading";
import { InvoiceInputForm } from "../../components/InvoiceInputForm";
import { getSalesOrderById } from "../../actions/salesOrder.action";

const UpdateInvoice = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        let data = await getInvoiceById(id);
        setData(data);
      } catch (_) {}

      setLoading(false);
    };

    load();
  }, []);

  if (isLoading) return <Loading />;
  return <InvoiceInputForm defaultValue={data} />;
};

export default UpdateInvoice;
