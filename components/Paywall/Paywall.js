import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import copy from "copy-to-clipboard";
import toast from "react-simple-toasts";
import { Heading, Text, Link, Box, Flex } from "@chakra-ui/react";
import Button from "components/Button";
import QRCode from "components/QRCode";
import createQuote from "utils/createQuote";
import fetchInvoiceById from "utils/fetchInvoiceById";
import useInvoiceStatePoller from "hooks/useInvoiceStatePoller";
import { getRedirectUrl } from "utils/invoice";
import verifyPaidPaywall from "utils/verifyPaidPaywall";
import {
  addPlebPayRefQueryParam,
  formatCurrency,
  makeProofOfPlebPayPath,
  normalizeUrl,
} from "./utils";

export default function Paywall({
  title,
  amount,
  currency,
  invoiceId,
  username,
  saltedPaywallId,
  plebPayRef,
  isProofOfPlebPay,
}) {
  const router = useRouter();
  const [quote, setQuote] = useState();
  const [paidInvoiceId, setPaidInvoiceId] = useState();
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
      await createQuote({
        invoiceId,
        title,
        amount,
        currency,
        username,
        isProofOfPlebPay,
      })
    );
    setIsLoading(false);
  };
  const invoiceState = useInvoiceStatePoller(quote?.invoiceId);
  const handlePayment = useCallback(
    async (paidInvoiceId) => {
      const invoice = await fetchInvoiceById(invoiceId);
      const redirectUrl = getRedirectUrl(invoice);

      if (!isProofOfPlebPay) {
        localStorage.setItem(saltedPaywallId, redirectUrl);
      }

      setRedirectUrl(redirectUrl);
      setPaidInvoiceId(paidInvoiceId);
      setQuote(null);
    },
    [invoiceId, isProofOfPlebPay, saltedPaywallId]
  );
  const copyLnInvoiceToClipboard = () => {
    if (quote?.lnInvoice) {
      copy(quote.lnInvoice);
      toast("Copied ⚡️ invoice to clipboard");
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      const possibleRedirectUrl = localStorage.getItem(saltedPaywallId);

      if (!possibleRedirectUrl) {
        return;
      }

      const verifiedRedirectUrl = await verifyPaidPaywall(
        invoiceId,
        possibleRedirectUrl
      );

      if (verifiedRedirectUrl) {
        setRedirectUrl(verifiedRedirectUrl);
      }
    };

    onLoad();
  }, [invoiceId, saltedPaywallId]);

  useEffect(() => {
    if (invoiceState && invoiceState !== "UNPAID") {
      handlePayment(quote.invoiceId);
    }
  }, [invoiceState, handlePayment, quote]);

  useEffect(() => {
    if (!redirectUrl || !invoiceId || !plebPayRef) {
      return;
    }

    if (isProofOfPlebPay && paidInvoiceId) {
      router.push(makeProofOfPlebPayPath(invoiceId, paidInvoiceId));
    } else if (!isProofOfPlebPay) {
      window.location = addPlebPayRefQueryParam(
        normalizeUrl(redirectUrl),
        plebPayRef
      );
    }
  }, [
    redirectUrl,
    invoiceId,
    plebPayRef,
    paidInvoiceId,
    router,
    isProofOfPlebPay,
  ]);

  useEffect(() => {
    if (quote) {
      const timeBuffer = 7000;

      const timeoutId = setTimeout(() => {
        setQuote(null);
        toast("Doh! ⚡️ invoice expired.");
      }, quote.expirationInSec * 1000 - timeBuffer);

      return () => clearTimeout(timeoutId);
    }
  }, [quote, handlePayment]);

  return (
    <Box maxW={594}>
      <Heading as="h1" size="3xl" mb={8}>
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
