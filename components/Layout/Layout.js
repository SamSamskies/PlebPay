import Head from "next/head";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>PlebPay ⚡️</title>
        <meta
          name="description"
          content="Create Bitcoin ⚡️ paywalls for any Strike user"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Box
        backgroundImage={
          query?.previewImageUrl
            ? ""
            : { base: "", xl: `url("/background-bubbles.png")` }
        }
        backgroundPosition="top right"
        backgroundRepeat="no-repeat"
        mt={118}
        h="100%"
        w="100%"
      >
        <main
          className={styles.main}
          style={
            query?.previewImageUrl
              ? {
                  backgroundImage: `url("${query.previewImageUrl}")`,
                  backgroundPosition: "top center",
                  backgroundRepeat: "no-repeat",
                }
              : null
          }
        >
          <div>{children}</div>
        </main>
      </Box>
    </>
  );
}
