import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import createPaywallLink from "../../utils/createPaywallLink";
import styles from "./CreatePaywallLink.module.css";

export default function CreatePaywallLink({ avatarUrl, currencies }) {
  const { query, isReady } = useRouter();
  const [paywallLink, setPaywallLink] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const paywallLink = await createPaywallLink({
      username: query.username,
      title: e.target.title.value,
      currency: currencies.find(({ isDefaultCurrency }) => isDefaultCurrency)
        ?.currency,
      amount: e.target.amount.value,
      redirectUrl: e.target.redirectUrl.value,
    });

    setPaywallLink(paywallLink);
    setIsLoading(false);
  };

  return isReady ? (
    <div className={styles.root}>
      {avatarUrl && (
        <Image src={avatarUrl} alt="user avatar" width="100%" height="100%" />
      )}
      <h1 className={styles.h1}>{query.username}</h1>
      <form onSubmit={handleSubmit}>
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
            <input
              name="title"
              placeholder="Check out my new video!"
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
              placeholder="https://www.youtube.com/watch?v=wY55CdGx4H0"
              required
            />
          </label>
        </div>
        <div className={styles.buttonContainer}>
          <Button isLoading={isLoading}>Submit</Button>
        </div>
      </form>
      <br />
      {paywallLink && (
        <div>
          <h2>Paywall Link Created 🎉</h2>
          <Link href={paywallLink}>
            <a>{paywallLink}</a>
          </Link>
        </div>
      )}
    </div>
  ) : null;
}
