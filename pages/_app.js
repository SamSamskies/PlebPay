import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "styles/theme";
import Layout from "components/Layout";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
