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
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        bg="#3d2a00"
        borderBottom="1px solid"
        borderColor="#f0a500"
        px={{ base: 4, md: 6 }}
        py={3}
        textAlign="center"
      >
        <Text
          color="#ffcc66"
          fontSize={{ base: "sm", md: "md" }}
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
