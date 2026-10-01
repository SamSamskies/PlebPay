import Head from "next/head";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>PlebPay ⚡️ — Retired</title>
        <meta
          name="description"
          content="PlebPay has been retired. Thank you to everyone who used this little corner of the Lightning network."
        />
        <meta property="og:title" content="PlebPay — Retired" />
        <meta
          property="og:description"
          content="PlebPay has been retired. Thank you for being part of it."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className={styles.main}>{children}</main>
    </>
  );
}
