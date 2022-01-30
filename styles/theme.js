import { extendTheme, theme as baseTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  colors: {
    brand: "#CCFF00",
    face: { primary: "white", secondary: "#cccccc", tertiary: "#999999" },
    object: { secondary: "#1a1a1a" },
  },
  fonts: {
    heading: `Montserrat, ${baseTheme.fonts?.heading}`,
    body: `Montserrat, ${baseTheme.fonts?.body}`,
  },
  components: {
    Heading: {
      baseStyle: {
        color: "white",
      },
    },
    FormLabel: {
      baseStyle: {
        color: "face.tertiary",
        fontWeight: "bold",
      },
    },
    Link: {
      baseStyle: {
        textDecoration: "underline",
        fontWeight: "bold",
      },
      variants: {
        brand: {
          textDecoration: "none",
          color: "brand",
          fontWeight: "bold",
        },
      },
    },
    Button: {
      variants: {
        primary: {
          backgroundColor: "brand",
          padding: "16px 48px",
          color: "black",
          borderRadius: 100,
          _hover: {
            boxShadow: "inset 0 0 100px 100px rgba(255, 255, 255, 0.5)",
          },
          _active: {
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4) 0 0)",
          },
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            fontWeight: "bold",
            borderRadius: "10px",
            backgroundColor: "object.secondary",
          },
        },
      },
      defaultProps: {
        focusBorderColor: "brand",
      },
    },
  },
  styles: {
    global: {
      body: {
        background: "black",
        color: "face.secondary",
        minWidth: 380,
      },
    },
  },
});

export default theme;
