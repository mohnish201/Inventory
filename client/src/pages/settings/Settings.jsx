import { Stack, SimpleGrid } from "@chakra-ui/react";
import { SettingsCard } from "../../components/SettingsCard";

const Settings = () => {
  const cards = [
    {
      title: "Organisation",
      pages: [
        {
          label: "Profile",
          path: "/settings/organisation/profile",
        },
        {
          label: "Warehouses",
          path: "/settings/organisation/warehouses",
        },

        {
          label: "Currencies",
          path: "/settings/organisation/currencies/manage",
        },
      ],
    },
    {
      title: "Brands",
      pages: [
        {
          label: "Create",
          path: "/settings/brands/create",
        },
        {
          label: "Manage Brands",
          path: "/settings/brands/manage",
        },
      ],
    },
    {
      title: "Manufacturers",
      pages: [
        {
          label: "Create",
          path: "/settings/manufacturers/create",
        },
        {
          label: "Manage Manufaturers",
          path: "/settings/manufacturers/manage",
        },
      ],
    },
    {
      title: "Roles",
      pages: [
        {
          label: "Create Role",
          path: "/settings/roles/create",
        },
        {
          label: "Manage Roles",
          path: "/settings/roles/manage",
        },
      ],
    },
    {
      title: "Users",
      pages: [
        {
          label: "Invite User",
          path: "/settings/users/invite",
        },
        {
          label: "Manage Users",
          path: "/settings/users/manage",
        },
      ],
    },
    {
      title: "Categories",
      pages: [
        {
          label: "Create Category",
          path: "/settings/categories/create",
        },
        {
          label: "Manage Categories",
          path: "/settings/categories/manage",
        },
      ],
    },
  ];

  return (
    <Stack p={4}>
      <SimpleGrid columns={[1, 2, 2, 4]} gap={4}>
        {cards.map(({ title, pages }, index) => (
          <SettingsCard key={title + index} title={title} pages={pages} />
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default Settings;
