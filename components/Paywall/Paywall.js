import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import copy from "copy-to-clipboard";
import toast from "react-simple-toasts";
import useLocalStorageState from "use-local-storage-state";
import Button from "../Button";
import createQuote from "../../utils/createQuote";
import fetchInvoiceById from "../../utils/fetchInvoiceById";
import styles from "./Paywall.module.css";
import useInvoiceStatePoller from "../../hooks/useInvoiceStatePoller";

const QRCode = dynamic(() => import("./QRCode"), { ssr: false });

export default function Paywall({
  title,
  amount,
  currency,
  invoiceId,
  username,
}) {
  const [quote, setQuote] = useState();
  const [redirectUrl, setRedirectUrl] = useLocalStorageState(invoiceId);
  const [isLoading, setIsLoading] = useState(false);
  const normalizeCurrency = (currency) => {
    switch (currency) {
      case "USDT":
        return "USD";
      default:
        return currency;
    }
  };
  const displayAmount = new Intl.NumberFormat(
    window.navigator.language ?? "en",
    {
      style: "currency",
      currency: normalizeCurrency(currency),
    }
  )
    .format(amount)
    .replace(/\.00$/, "");
  const handleClick = async () => {
    setIsLoading(true);
    setQuote(
      await createQuote({ invoiceId, title, amount, currency, username })
    );
    setIsLoading(false);
  };
  const invoiceState = useInvoiceStatePoller(quote?.invoiceId);
  const handlePayment = useCallback(async () => {
    const { description } = await fetchInvoiceById(invoiceId);

    setRedirectUrl(JSON.parse(description).redirectUrl);
    setQuote(null);
  }, [invoiceId, setRedirectUrl]);

  useEffect(() => {
    if (invoiceState && invoiceState !== "UNPAID") {
      handlePayment();
    }
  }, [invoiceState, handlePayment]);

  useEffect(() => {
    if (redirectUrl) {
      window.location = /^(http(s?)):\/\//i.test(redirectUrl)
        ? redirectUrl
        : `//${redirectUrl}`;
    }
  }, [redirectUrl]);

  useEffect(() => {
    if (quote) {
      const timeBuffer = 3000;

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
            <Button onClick={handleClick} isLoading={isLoading}>
              Enter for {displayAmount}
            </Button>
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
            <a
              role="button"
              href="#"
              onClick={() => {
                copy(quote.lnInvoice);
                toast("Copied");
              }}
            >
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
