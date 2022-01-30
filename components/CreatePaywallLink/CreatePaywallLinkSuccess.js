import Image from "next/image";
import copy from "copy-to-clipboard";
import toast from "react-simple-toasts";
import { Heading, Text, HStack } from "@chakra-ui/react";
import StrikeMeLink from "./StrikeMeLink";
import IconButton from "../IconButton/IconButton";
import Input from "../Input";

export default function CreatePaywallLinkSuccess({ username, paywallLink }) {
  return (
    <>
      <Heading as="h1" size="3xl" mb={4}>
        All good 💪
      </Heading>
      <Text mb={16}>
        Share this link and get paid. All funds will be converted and instantly
        credited to <StrikeMeLink username={username} />.
      </Text>
      <HStack spacing={4}>
        <Input value={paywallLink} readOnly />
        <IconButton
          onClick={() => {
            copy(paywallLink);
            toast("Paywall link copied to clipboard 🎉");
          }}
        >
          <Image
            src="/copy.png"
            alt="copy icon"
            layout="fixed"
            width={19}
            height={20}
          />
        </IconButton>
      </HStack>
    </>
  );
}
