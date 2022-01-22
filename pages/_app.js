import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "../utils/gtag";
import Layout from "../components/Layout";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";
import "../styles/globals.css";
import Head from "next/head";

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
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
        <meta
          name="twitter:title"
          content="PlebPay ⚡ - Create a Bitcoin Lightning paywall and get paid directly to your Strike
        account."
        />
        <meta
          name="twitter:image"
          content="https://www.plebpay.com/distracted-boyfriend-meme.jpeg"
        />
      </Head>
      <SafeHydrate>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SafeHydrate>
    </>
  );
}

export default MyApp;
