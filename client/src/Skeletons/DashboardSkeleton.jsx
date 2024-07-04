import { Box, Grid, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const DashboardSkeleton = () => {
  return (
    <Stack spacing={10} p={6}>
      <Grid
        gridGap={6}
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {[...new Array(9).fill(0)].map((_, index) => (
          <Skeleton
            key={index}
            borderRadius={"6px"}
            height={"80px"}
            w={300}
          ></Skeleton>
        ))}
      </Grid>

      <Stack
        direction={{ base: "column", lg: "row" }}
        justifyContent={"space-between"}
        gap={4}
        w="100%"
      >
        <Skeleton
          h={400}
          borderRadius={"10px"}
          w={{ base: "100%", lg: "50%" }}
        ></Skeleton>
        <Skeleton
          h={400}
          borderRadius={"10px"}
          w={{ base: "100%", lg: "50%" }}
        ></Skeleton>
      </Stack>
    </Stack>
  );
};

export { DashboardSkeleton };
