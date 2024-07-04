import { useEffect, useState } from "react";
import { Stack, SimpleGrid } from "@chakra-ui/react";
import { getAllBrands } from "../../actions/brand.actions";
import { BrandCard } from "../../components/BrandCard";
import { Controller } from "../../components/Controller";
import { Loading } from "../../components/Loading";
import { Unauthorized } from "../../components/Unauthorized";
import { useSearchParams } from "../../hooks/useSearchParams.hook";

const ManageBrands = () => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { page = 1 } = useSearchParams();
  const [pageEnd, setPageEnd] = useState(1);
  const [limit, setLimit] = useState(10);

  const load = async () => {
    setLoading(true);

    try {
      let { data, pageEnd } = await getAllBrands(page, limit);
      setBrands(data);
      setPageEnd(pageEnd);
    } catch (error) {
      setBrands(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [page]);

  if (isLoading) return <Loading />;

  if (!brands) return <Unauthorized />;

  return (
    <Stack>
      <Controller heading={"Brands"} pageProps={{ page, pageEnd }} />

      <SimpleGrid columns={[1, 2, 2, 4]} gap={2} p={4} mt={20}>
        {brands.map((item) => (
          <BrandCard data={item} key={item._id} reload={load} />
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default ManageBrands;
