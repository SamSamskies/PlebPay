import Button from "../Button";
import createQuote from "../../utils/createQuote";

export default function Paywall({ title, amount, currency, invoiceId }) {
  const displayAmount = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  })
    .format(amount)
    .replace(/\.00$/, "");
  const handleClick = async () => {
    const quote = await createQuote(invoiceId);

    console.log("quote", quote);
  };

  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Enter for {displayAmount}</Button>
    </div>
  );
}
