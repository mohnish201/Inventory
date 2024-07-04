import { Link, useLocation, useNavigate } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const Controller = ({ heading, pageProps, insertion }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (overload) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", Number(pageProps.page) + overload);
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      overflowX={"auto"}
      userSelect={"none"}
      alignItems={{ base: "flex-start", sm: "center" }}
      justifyContent={"space-between"}
      p={4}
      position={"fixed"}
      gap={4}
      w={["full", "full", "full", "calc(100vw - 220px)"]}
      bg={"#fff"}
      whiteSpace={"nowrap"}
      borderBottom={"1px solid #f2f2f2"}
      zIndex={99}
    >
      <Text fontSize={24} fontWeight={700}>
        {" "}
        {heading}{" "}
      </Text>

      <Flex
        w={{ base: "full", sm: "auto" }}
        gap={4}
        justifyContent={{ base: "space-between", sm: "normal" }}
      >
        {pageProps && (
          <Flex fontSize={28} alignItems={"center"} gap={2}>
            <Text
              _hover={{ color: "#f2f2f2" }}
              p={2}
              rounded={"full"}
              fontSize={10}
              onClick={() => handlePageChange(-1)}
              cursor={"pointer"}
              pointerEvents={pageProps.page === 1 ? "none" : ""}
            >
              <SlArrowLeft />
            </Text>

            <Text fontSize={14}>
              {" "}
              {pageProps.page} of {pageProps.pageEnd}{" "}
            </Text>

            <Text
              _hover={{ bg: "#f2f2f2" }}
              p={2}
              rounded={"full"}
              fontSize={10}
              onClick={() => handlePageChange(1)}
              cursor={"pointer"}
              pointerEvents={pageProps.page === pageProps.pageEnd ? "none" : ""}
            >
              <SlArrowRight />
            </Text>
          </Flex>
        )}

        {insertion && (
          <Link to={insertion.path}>
            <Button size={"sm"} leftIcon={<GoPlus />}>
              {" "}
              {insertion.text}{" "}
            </Button>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};

export { Controller };
