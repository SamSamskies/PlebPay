import { useState } from "react";
import QRCode from "qrcode.react";
import Button from "../Button";
import createQuote from "../../utils/createQuote";
import styles from "./Paywall.module.css";

export default function Paywall({ title, amount, currency, invoiceId }) {
  const [quote, setQuote] = useState();
  const displayAmount = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  })
    .format(amount)
    .replace(/\.00$/, "");
  const handleClick = async () => {
    setQuote(await createQuote(invoiceId));
  };

  return (
    <div>
      <h1>{title}</h1>
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
