import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Text } from "@chakra-ui/react";
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
        as="aside"
        w="90%"
        maxW="520px"
        mx="auto"
        mt={4}
        bg="#3d2a00"
        border="1px solid"
        borderColor="#f0a500"
        borderRadius="md"
        px={4}
        py={3}
        textAlign="center"
      >
        <Text
          color="#ffcc66"
          fontSize="sm"
          fontWeight="bold"
          lineHeight="short"
        >
          PlebPay is deprecated and in maintenance mode. Existing paywalls will
          stop working on October 1, 2026.
        </Text>
      </Box>
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
