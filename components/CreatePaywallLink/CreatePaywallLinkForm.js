import Button from "../Button";
import styles from "./CreatePaywallLinkForm.module.css";
import BackgroundBubbles from "../BackgroundBubbles";
import Image from "next/image";
import StrikeMeLink from "./StrikeMeLink";

export default function CreatePaywallLinkForm({
  avatarUrl,
  username,
  currency,
  isLoading,
  onSubmit,
}) {
  return (
    <div className={styles.root}>
      <BackgroundBubbles />
      <div className={styles.usernameContainer}>
        <div className={styles.avatarContainer}>
          {avatarUrl && (
            <Image
              src={avatarUrl}
              alt="user avatar"
              layout="fill"
              className={styles.avatar}
            />
          )}
        </div>
        <h1>{username}</h1>
      </div>
      <p>
        Customize your paywall settings. All funds will be converted and
        credited to <StrikeMeLink username={username} />
      </p>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            {`Price (${currency})`}
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
              name="redirectUrl"
              placeholder="example.com"
              pattern="^.{1,120}$"
              title="Max 120 chars."
              required
            />
          </label>
        </div>
        <p className={styles.legalLinksContainer}>
          By clicking &quot;Create Paywall,&quot; you agree to our{" "}
          <a
            href="https://strike.me/legal/tos/"
            target="_blank"
            rel="noreferrer"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="https://strike.me/legal/privacy/"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Notice
          </a>
          .
        </p>
        <div className={styles.buttonContainer}>
          <Button isLoading={isLoading}>Create Paywall</Button>
        </div>
      </form>
    </div>
  );
}
