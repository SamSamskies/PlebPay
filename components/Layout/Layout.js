import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./Layout.module.css";
import BackgroundBubbles from "../BackgroundBubbles";

export default function Layout({ children }) {
  const { query } = useRouter();

  return (
    <div>
      <Head>
        <title>PlebPay ⚡️</title>
        <meta
          name="description"
          content="Create Bitcoin ⚡️ paywalls for any Strike user"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      {!query?.previewImageUrl && <BackgroundBubbles />}
      <main
        className={styles.main}
        style={
          query?.previewImageUrl
            ? {
                backgroundImage: `url("${query.previewImageUrl}")`,
                backgroundPosition: "top center",
                backgroundRepeat: "no-repeat",
              }
            : null
        }
      >
        <div>{children}</div>
      </main>
    </div>
  );
}
