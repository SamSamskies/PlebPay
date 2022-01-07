import Button from "../../Button";

export default function Cta({ title, amount, currency, invoiceId }) {
  const displayAmount = new Intl.NumberFormat("en", {
    style: "currency",
    currency,
  })
    .format(amount)
    .replace(/\.00$/, "");
  const handleClick = () => {
    window.alert("not implemented yet.");
  };

  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Enter for {displayAmount}</Button>
    </div>
  );
}
