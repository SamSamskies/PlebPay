import dynamic from "next/dynamic";
import {
  Heading,
  HStack,
  Text,
  Box,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import copy from "copy-to-clipboard";
import toast from "react-simple-toasts";
import Image from "next/image";
import Input from "../Input";
import IconButton from "../IconButton";
import StrikeMeLink from "../CreatePaywallLink/StrikeMeLink";

const QRCode = dynamic(() => import("../QRCode"), { ssr: false });

export default function ProofOfPlebPay({ paidInvoiceId, title, username }) {
  return (
    <Box maxW={388}>
      <Heading as="h1" size="3xl" mb={4}>
        Payment received 🎉
      </Heading>
      <Text mb={16}>
        {`This QR code contains your receipt ID which can be shown as proof of payment for "${title}". Funds were sent to `}
        <StrikeMeLink username={username} />.
      </Text>
      <QRCode data={paidInvoiceId} />
      <HStack mt={16} spacing={4} alignItems="flex-end">
        <FormControl>
          <FormLabel>Receipt ID</FormLabel>
          <Input value={paidInvoiceId} readOnly />
        </FormControl>
        <IconButton
          onClick={() => {
            copy(paidInvoiceId);
            toast("Receipt ID copied to clipboard 🎉");
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
    </Box>
  );
}
