import { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import Button from "../Button";
import createQuote from "../../utils/createQuote";
import fetchInvoiceById from "../../utils/fetchInvoiceById";
import styles from "./Paywall.module.css";
import useInvoiceStatePoller from "../../hooks/useInvoiceStatePoller";

export default function Paywall({ title, amount, currency, invoiceId }) {
  const [quote, setQuote] = useState();
  const [redirectUrl, setRedirectUrl] = useState();
  const displayAmount = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  })
    .format(amount)
    .replace(/\.00$/, "");
  const handleClick = async () => {
    setQuote(await createQuote(invoiceId));
  };

  const invoiceState = useInvoiceStatePoller(quote ? quote.invoiceId : null);

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
  }, [invoiceState, invoiceId]);

  useEffect(() => {
    if (redirectUrl) {
      window.location = redirectUrl;
    }
  }, [redirectUrl]);

  return (
    <div>
      <h1>{redirectUrl ? `You're in.` : title}</h1>
      {redirectUrl && (
        <p>
          If your browser didn&apos;t redirect you automatically,{" "}
          <a href={redirectUrl}>click here</a>
        </p>
      )}
      {!quote && (
        <Button onClick={handleClick}>Enter for {displayAmount}</Button>
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
  );
}
