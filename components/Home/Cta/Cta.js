import { useRouter } from "next/router";
import Button from "../../Button";
import styles from "./Cta.module.css";

export default function Cta() {
  const { query, isReady } = useRouter();
  const title = query.title ?? "Untitled Paywall";
  const amount = query.amount ?? 1;
  const displayAmount = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  })
    .format(amount)
    .replace(/\.00$/, "");
  const handleClick = () => {
    window.alert("not implemented yet.");
  };

  return isReady ? (
    <div className={styles.ctaContainer}>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Enter for {displayAmount}</Button>
    </div>
  ) : null;
}
