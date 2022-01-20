import Button from "../Button";
import styles from "./CreatePaywallLinkForm.module.css";

export default function CreatePaywallLinkForm({
  currency,
  isLoading,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          {`Amount (${currency})`}
          <input
            type="number"
            name="amount"
            min={0.01}
            max={100}
            step="0.01"
            placeholder="0.01"
            autoFocus
            required
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          Title{" "}
          <input
            name="title"
            placeholder="Check out my new video!"
            pattern="^.{1,50}$"
            title="Max 50 chars."
            required
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          Redirect URL{" "}
          <input
            type="url"
            name="redirectUrl"
            placeholder="https://www.youtube.com/watch?v=wY55CdGx4H0"
            pattern="^.{1,120}$"
            title="Max 120 chars."
            required
          />
        </label>
      </div>
      <div className={styles.buttonContainer}>
        <Button isLoading={isLoading}>Create Paywall</Button>
      </div>
    </form>
  );
}
