import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import QRCode from "qrcode.react";
import copy from "copy-to-clipboard";
import toast from "react-simple-toasts";
import useLocalStorageState from "use-local-storage-state";
import Button from "../Button";
import Main from "../Main";
import createQuote from "../../utils/createQuote";
import fetchInvoiceById from "../../utils/fetchInvoiceById";
import styles from "./Paywall.module.css";
import useInvoiceStatePoller from "../../hooks/useInvoiceStatePoller";

export default function Paywall({ title, amount, currency, invoiceId }) {
  const { query } = useRouter();
  const [quote, setQuote] = useState();
  const [redirectUrl, setRedirectUrl] = useLocalStorageState(invoiceId);
  const [isLoading, setIsLoading] = useState(false);
  const displayAmount = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  })
    .format(amount)
    .replace(/\.00$/, "");
  const handleClick = async () => {
    setIsLoading(true);
    setQuote(await createQuote(invoiceId));
    setIsLoading(false);
  };

  const invoiceState = useInvoiceStatePoller(quote?.invoiceId);

  useEffect(() => {
    if (invoiceState && invoiceState !== "UNPAID") {
      fetchInvoiceById(invoiceId)
        .then(({ description }) => {
          setRedirectUrl(JSON.parse(description).redirectUrl);
        })
        .finally(() => {
          setQuote(null);
        });
    }
  }, [invoiceState, invoiceId, setRedirectUrl]);

  useEffect(() => {
    if (redirectUrl) {
      window.location = redirectUrl;
    }
  }, [redirectUrl]);

  useEffect(() => {
    if (quote) {
      setTimeout(() => setQuote(null), quote.expirationInSec * 1000);
    }
  }, [quote]);

  return (
    <div
      className={styles.root}
      style={
        query?.previewImageUrl
          ? {
              backgroundImage: `url("${query.previewImageUrl}")`,
              backgroundSize: "cover",
            }
          : null
      }
    >
      <Main>
        <div className={styles.contentContainer}>
          <div>
            <h1>{redirectUrl ? `You're in.` : title}</h1>
            {redirectUrl && (
              <p>
                If your browser didn&apos;t redirect you automatically,{" "}
                <a href={redirectUrl}>click here</a>
              </p>
            )}
            {!quote && !redirectUrl && (
              <Button onClick={handleClick} isLoading={isLoading}>
                Enter for {displayAmount}
              </Button>
            )}
            {quote && (
              <div className={styles.qrCodeContainer}>
                <QRCode
                  value={quote.lnInvoice}
                  bgColor="black"
                  fgColor="white"
                  size={192}
                />
              </div>
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
      </Main>
    </div>
  );
}
