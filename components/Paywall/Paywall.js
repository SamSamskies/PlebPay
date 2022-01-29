import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import copy from "copy-to-clipboard";
import toast from "react-simple-toasts";
import Button from "../Button";
import createQuote from "../../utils/createQuote";
import fetchInvoiceById from "../../utils/fetchInvoiceById";
import styles from "./Paywall.module.css";
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
    <div className={styles.root}>
      <h1>{redirectUrl ? `You're in.` : title}</h1>
      <div className={styles.contentContainer}>
        {redirectUrl && (
          <p>
            If your browser didn&apos;t redirect you automatically,{" "}
            <a href={redirectUrl}>click here</a>
          </p>
        )}
        {!quote && !redirectUrl && (
          <>
            <div>
              <Button onClick={handleClick} isLoading={isLoading}>
                Enter for {displayAmount}
              </Button>
            </div>
            <p>
              New to Bitcoin?{" "}
              <a
                href="https://strike.me/download"
                target="_blank"
                rel="noreferrer"
              >
                Click here
              </a>{" "}
              to download Strike and get started.
            </p>
          </>
        )}
        {quote && (
          <QRCode
            data={quote.lnInvoice}
            animationDuration={quote.expirationInSec}
          />
        )}
      </div>
      {quote && (
        <div>
          <p>
            Alternatively, to copy the Bitcoin Lighting invoice,{" "}
            <a role="button" href="#" onClick={copyLnInvoiceToClipboard}>
              click here.
            </a>
          </p>
          <p>
            To pay from a Bitcoin wallet,{" "}
            <a href={`lightning:${quote.lnInvoice}`}>click here.</a>
          </p>
        </div>
      )}
    </div>
  );
}
