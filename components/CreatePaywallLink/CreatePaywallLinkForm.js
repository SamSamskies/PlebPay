import Button from "../Button";
import styles from "./CreatePaywallLinkForm.module.css";

export default function CreatePaywallLinkForm({ isLoading, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Amount{" "}
          <input
            type="number"
            name="amount"
            min={0.01}
            step="0.01"
            placeholder={1}
            autoFocus
            required
          />
        </label>
      </div>
      <br />
      <div>
        <label>
          Title{" "}
          <input name="title" placeholder="Check out my new video!" required />
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
            required
          />
        </label>
      </div>
      <div className={styles.buttonContainer}>
        <Button isLoading={isLoading}>Submit</Button>
      </div>
    </form>
  );
}
