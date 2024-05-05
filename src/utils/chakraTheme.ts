import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: {
    50: "#e9f5ff",
    100: "#c8e0ff",
    200: "#a5ccff",
    300: "#7fb7ff",
    400: "#5aa3ff",
    500: "#3a8fff",
    600: "#2d6fcc",
    700: "#1f4a99",
    800: "#112e66",
    900: "#001133",
  },
};

export const themeChakra = extendTheme({
  colors,
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  styles: {
    global: {
      "#root": {
        width: "100%",
      },
    },
  },
});
