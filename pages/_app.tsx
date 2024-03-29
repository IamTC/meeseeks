import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "reset-css";
import PlayerLayout from "../components/playerLayout";

// Change chakra colors since they seems to be off
const theme = extendTheme({
  colors: {
    gray: {
      100: "#F5F5F5",
      200: "#EEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ":focus": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      {Component.authPage ? (
        <Component {...pageProps} />
      ) : (
        <PlayerLayout>
          <Component {...pageProps}></Component>
        </PlayerLayout>
      )}
    </ChakraProvider>
  );
}

export default MyApp;
