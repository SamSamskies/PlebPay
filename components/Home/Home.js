import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Heading,
  Text,
  FormControl,
  FormLabel,
  Link,
  Stack,
  Box,
  Flex,
} from "@chakra-ui/react";
import Button from "../Button";
import Input from "../Input";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(
      "lightning:lnbc10n1pjf9pl6pp5z4fj5s0sk2g2nnstjusvy2s8mjxpfxpq4kv76u7ecxqmq2lkfrqqdqu2askcmr9wssx7e3q2dshgmmndp5scqzzsxqyz5vqsp5r486eear85sf99fd3waj9nw7890eamzmav3ayrfgrhtwh3fwpm4s9qyyssqzqmyg8pj97cwpcye75hy0j846kn5c4yge7u4rztwpkwqr3k25ffhwcy4nc2kw6g9c39kcgmapcyjk4z8vltzfm5ys9pqdglg2kcfq3sqzzh8dw"
    );
    // setIsLoading(true);
    // router.push(`/create/${e.target.username.value}`);
  };

  return (
    <>
      <Head>
        <meta
          property="og:title"
          content="PlebPay ⚡ - Create a Bitcoin Lightning paywall and get paid directly to your Strike
        account."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/distracted-boyfriend-meme.jpeg" />
        <meta property="og:url" content="https://plebpay.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PlebPay ⚡" />
        <meta
          name="twitter:description"
          content="Create a Bitcoin Lightning paywall and get paid directly to your Strike
        account."
        />
        <meta
          name="twitter:image"
          content="https://www.plebpay.com/distracted-boyfriend-meme.jpeg"
        />
      </Head>
      <Flex height={626} direction="column" justifyContent="space-between">
        <Box maxW={388}>
          <Heading as="h1" size="3xl" mb={4}>
            PlebPay ⚡️
          </Heading>
          <Text mb={16}>
            Create a Bitcoin Lightning paywall and get paid directly to your
            Strike account.
          </Text>
          <form onSubmit={handleSubmit}>
            <Stack
              alignItems="flex-end"
              spacing={4}
              direction={{ base: "column", sm: "row" }}
            >
              <FormControl>
                <FormLabel>Strike Username</FormLabel>
                <Input
                  name="username"
                  placeholder="jack"
                  autoFocus
                  required
                  autoComplete="off"
                />
              </FormControl>
              <Button isLoading={isLoading} type="submit">
                OK
              </Button>
            </Stack>
          </form>
        </Box>
        <Text>
          Need a username?{" "}
          <Link href="https://strike.me/download" isExternal variant="brand">
            Click here
          </Link>{" "}
          to download Strike and get started.
        </Text>
      </Flex>
      <a
        href="https://github.com/SamSamskies/strike-paywall"
        style={{ position: "fixed", top: 0, right: 0 }}
        target="_blank"
        rel="noreferrer"
      >
        <Image
          width="149"
          height="149"
          src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
          className="attachment-full size-full"
          alt="Fork me on GitHub"
          data-recalc-dims="1"
        />
      </a>
    </>
  );
}
