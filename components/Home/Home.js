import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import styles from "./Home.module.css";
import Button from "../Button";

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
          content="Strike Paywall - Create Bitcoin ⚡️ paywalls for any Strike user"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/distracted-boyfriend-meme.jpeg" />
        <meta property="og:url" content="https://strikepaywall.vercel.app/" />
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
      <h1>Strike Paywall</h1>
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
        <Button isLoading={isLoading}>Let&apos;s Go!</Button>
      </form>
    </div>
  );
}
