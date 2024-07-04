import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  Heading,
  StackDivider,
  Text,
  HStack,
} from "@chakra-ui/react";

import { GoArrowUpRight } from "react-icons/go";

const SettingsCard = ({ title, pages }) => {
  return (
    <Card
      userSelect={"none"}
      boxShadow={"none"}
      bg={"brand.bg.primary"}
      border={"1px solid #f2f2f2"}
    >
      <CardHeader>
        <Heading size="md" color={"brand.text.primary"} fontWeight={500}>
          {title}
        </Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="2">
          {pages.map(({ label, path }, index) => (
            <Link to={path} key={label + index}>
              <HStack
                fontSize={14}
                spacing={1}
                _hover={{ color: "brand.accent", fontWeight: 500 }}
              >
                <Text>{label}</Text>
                <GoArrowUpRight fontSize={10} />
              </HStack>
            </Link>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

export { SettingsCard };
