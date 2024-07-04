import { Link } from "react-router-dom";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { useActive } from "../hooks/useActive.hook";

const SidebarTab = ({ data: { heading, icon, submenu } }) => {
  const { isActive } = useActive();

  return (
    <AccordionItem mb={3} border={"none"}>
      <AccordionButton borderRadius={"8px"} _expanded={{ bg: "#f2f2f2" }}>
        <Flex gap={1} alignItems={"center"} as="span" flex="1" textAlign="left">
          <Text fontSize={20}> {icon} </Text>
          <Text> {heading} </Text>
        </Flex>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel p={2}>
        <Stack spacing={1}>
          {submenu.map(({ label, path }, index) => (
            <Link to={path} key={label + index}>
              <Text
                fontSize={14}
                _hover={{ bg: isActive(path) ? "brand.accent" : "#f2f2f2" }}
                color={isActive(path) && "#fff"}
                bg={isActive(path) && "brand.accent"}
                px={4}
                py={2}
                borderRadius={8}
              >
                {label}
              </Text>
            </Link>
          ))}
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  );
};

export { SidebarTab };
