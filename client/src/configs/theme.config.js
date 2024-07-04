import { extendTheme } from "@chakra-ui/react";
import { modalAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalAnatomy.keys);

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const fonts = {
  heading: `'M PLUS Rounded 1c'`,
  body: `'M PLUS Rounded 1c'`,
};

const colors = {
  brand: {
    accent: "#06265a",
    text: {
      primary: "#1c1e2a",
      secondary: "#5b5d69",
    },
    bg: {
      primary: "#f8f8fa",
    },
  },
};

const styles = {
  global: {
    "html, body": {
      color: "brand.text.primary",
    },
  },
};

const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: "medium",
  },

  variants: {
    solid: defineStyle({
      bg: "brand.accent",
      color: "#fff",
      _focusVisible: false,
      _hover: {
        bg: "brand.accent",
      },
    }),
  },
});

const Modal = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    dialog: {
      p: 4,
      borderRadius: 15,
    },
  }),
});

const Menu = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    list: {
      borderRadius: 15,
      p: 2,
    },
    item: {
      bg: "none",
      borderRadius: "11px",
      py: 2,

      _hover: {
        bg: "gray.100",
      },
    },
  }),
});

const theme = extendTheme({
  config,
  fonts,
  colors,
  styles,
  components: {
    Button,
    Modal,
    Menu,
  },
});

export { theme };
