import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import copy from "copy-to-clipboard";
import toast from "react-simple-toasts";
import { Heading, Text, Link, Box, Flex } from "@chakra-ui/react";
import Button from "../Button";
import createQuote from "../../utils/createQuote";
import fetchInvoiceById from "../../utils/fetchInvoiceById";
import useInvoiceStatePoller from "../../hooks/useInvoiceStatePoller";
import { getRedirectUrl } from "../../utils/invoice";
import verifyPaidPaywall from "../../utils/verifyPaidPaywall";
import { addPlebPayRefQueryParam, formatCurrency, normalizeUrl } from "./utils";

const QRCode = dynamic(() => import("./QRCode"), { ssr: false });

export default function Paywall({
  title,
  amount,
  currency,
  invoiceId,
  username,
  paywallId,
  plebPayRef,
}) {
  const [quote, setQuote] = useState();
  const [redirectUrl, setRedirectUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const displayAmount = formatCurrency({
    amount,
    currency,
    locales: window.navigator.language,
  });
  const handleClick = async () => {
    setIsLoading(true);
    setQuote(
      await createQuote({ invoiceId, title, amount, currency, username })
    );
    setIsLoading(false);
  };
  const invoiceState = useInvoiceStatePoller(quote?.invoiceId);
  const handlePayment = useCallback(async () => {
    const invoice = await fetchInvoiceById(invoiceId);
    const redirectUrl = getRedirectUrl(invoice);

    setRedirectUrl(redirectUrl);
    setQuote(null);
  }, [invoiceId, setRedirectUrl]);
  const copyLnInvoiceToClipboard = () => {
    if (quote?.lnInvoice) {
      copy(quote.lnInvoice);
      toast("Copied ⚡️ invoice to clipboard");
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      // TODO: remove paywallId check
      // deprecating use of paywallId as LS key
      const possibleRedirectUrl =
        localStorage.getItem(invoiceId) ?? localStorage.getItem(paywallId);
      const verifiedRedirectUrl = await verifyPaidPaywall(
        invoiceId,
        possibleRedirectUrl
      );

      if (verifiedRedirectUrl) {
        setRedirectUrl(verifiedRedirectUrl);
      }
    };

    onLoad();
  }, [invoiceId, paywallId]);

  useEffect(() => {
    if (invoiceState && invoiceState !== "UNPAID") {
      handlePayment();
    }
  }, [invoiceState, handlePayment]);

  useEffect(() => {
    if (redirectUrl && invoiceId && plebPayRef) {
      localStorage.setItem(invoiceId, redirectUrl);
      window.location = addPlebPayRefQueryParam(
        normalizeUrl(redirectUrl),
        plebPayRef
      );
    }
  }, [redirectUrl, invoiceId, plebPayRef]);

  useEffect(() => {
    if (quote) {
      const timeBuffer = 7000;

      setTimeout(() => {
        setQuote(null);
        toast("Doh! ⚡️ invoice expired.");
        fetchInvoiceById(quote.invoiceId).then(({ state }) => {
          if (state !== "UNPAID") {
            handlePayment();
          }
        });
      }, quote.expirationInSec * 1000 - timeBuffer);
    }
  }, [quote, handlePayment]);

  return (
    <Box maxW={594}>
      <Heading as="h1" size="3xl" mb={4}>
        {redirectUrl ? `You're in.` : title}
      </Heading>
      <Flex direction="column" justifyContent="space-between" height={400}>
        {redirectUrl && (
          <Text>
            If your browser didn&apos;t redirect you automatically,{" "}
            <Link href={redirectUrl} isExternal variant="brand">
              click here
            </Link>
          </Text>
        )}
        {!quote && !redirectUrl && (
          <>
            <Box>
              <Button onClick={handleClick} isLoading={isLoading}>
                Enter for {displayAmount}
              </Button>
            </Box>
            <Text>
              New to Bitcoin?{" "}
              <Link
                href="https://strike.me/download"
                isExternal
                variant="brand"
              >
                Click here
              </Link>{" "}
              to download Strike and get started.
            </Text>
          </>
        )}
        {quote && (
          <QRCode
            data={quote.lnInvoice}
            animationDuration={quote.expirationInSec}
          />
        )}
      </Flex>
      {quote && (
        <Box>
          <Text>
            Alternatively, to copy the Bitcoin Lighting invoice,{" "}
            <Link
              role="button"
              href="#"
              onClick={copyLnInvoiceToClipboard}
              variant="brand"
            >
              click here.
            </Link>
          </Text>
          <Text>
            To pay from a Bitcoin wallet,{" "}
            <Link href={`lightning:${quote.lnInvoice}`} variant="brand">
              click here.
            </Link>
          </Text>
        </Box>
      )}
    </Box>
  );
}
