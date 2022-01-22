import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import Head from "next/head";
import * as gtag from "../utils/gtag";
import Layout from "../components/Layout";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";
import "../styles/globals.css";

function SafeHydrate({ children, ssr }) {
  return ssr ? (
    children
  ) : (
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
      {router.pathname !== "/" && (
        <Head>
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
      )}
      <SafeHydrate ssr={router.pathname === "/"}>
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
