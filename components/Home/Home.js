import { Box, Heading, Link, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box maxW="640px" w="100%">
      <Text
        color="brand"
        fontWeight="bold"
        fontSize="xl"
        mb={{ base: 12, md: 20 }}
      >
        PlebPay <span aria-hidden="true">⚡️</span>
      </Text>
      <Heading
        as="h1"
        fontSize={{ base: "36px", md: "56px" }}
        lineHeight="1.15"
        letterSpacing="-0.04em"
        mb={6}
      >
        This little tool has been retired.
      </Heading>
      <Text
        fontSize={{ base: "md", md: "lg" }}
        lineHeight="1.8"
        maxW="540px"
        mb={5}
      >
        PlebPay helped people share their work and get paid over the Lightning
        network. Thank you to everyone who gave it a try.
      </Text>
      <Text fontSize={{ base: "md", md: "lg" }} lineHeight="1.8" maxW="540px">
        As of October 1, 2026, paywall creation, payments, and receipt
        verification are no longer available. Existing PlebPay links have been
        retired too.
      </Text>
      <Box
        mt={{ base: 12, md: 16 }}
        pt={6}
        borderTop="1px solid"
        borderColor="#333333"
      >
        <Link
          href="https://github.com/SamSamskies/strike-paywall"
          color="brand"
          fontSize="sm"
          isExternal
          _focusVisible={{
            outline: "2px solid",
            outlineColor: "brand",
            outlineOffset: "4px",
          }}
        >
          Explore the source on GitHub
        </Link>
      </Box>
    </Box>
  );
}
