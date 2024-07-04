import { Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { InvoiceInputForm } from "../../components/InvoiceInputForm";
import { useSearchParams } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { getSalesOrderById } from "../../actions/salesOrder.action";

const CreateInvoice = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const fetchedData = await getSalesOrderById(id);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <Stack>
      <InvoiceInputForm salesOrderValue={data} />
    </Stack>
  );
};

export default CreateInvoice;
