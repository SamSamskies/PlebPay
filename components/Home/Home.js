import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./Home.module.css";
import Button from "../Button";
import Head from "next/head";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(`/create/${e.target.username.value}`);
  };

  return (
    <div className={styles.root}>
      <Head>
        <meta
          property="og:title"
          content="PlebPay ⚡ - Create a Bitcoin Lightning paywall and get paid directly to your Strike
        account."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/distracted-boyfriend-meme.jpeg" />
        <meta property="og:url" content="https://plebpay.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PlebPay ⚡" />
        <meta
          name="twitter:description"
          content="Create a Bitcoin Lightning paywall and get paid directly to your Strike
        account."
        />
        <meta
          name="twitter:image"
          content="https://www.plebpay.com/distracted-boyfriend-meme.jpeg"
        />
      </Head>
      <a
        href="https://github.com/SamSamskies/strike-paywall"
        className={styles.githubRibbon}
        target="_blank"
        rel="noreferrer"
      >
        <Image
          width="149"
          height="149"
          src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149"
          className="attachment-full size-full"
          alt="Fork me on GitHub"
          data-recalc-dims="1"
        />
      </a>
      <div className={styles.contentContainer}>
        <div className={styles.topContent}>
          <h1>PlebPay ⚡️</h1>
          <p>
            Create a Bitcoin Lightning paywall and get paid directly to your
            Strike account.
          </p>
          <form onSubmit={handleSubmit}>
            <label>
              Strike Username{" "}
              <input
                name="username"
                placeholder="jack"
                autoFocus
                required
                autoComplete="off"
              />
            </label>
            <Button isLoading={isLoading}>OK</Button>
          </form>
        </div>
        <p>
          Need a username?{" "}
          <a href="https://strike.me/download" target="_blank" rel="noreferrer">
            Click here
          </a>{" "}
          to download Strike and get started.
        </p>
      </div>
    </div>
  );
}
