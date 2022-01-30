import React from "react";
import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "../styles/theme";
import * as gtag from "../utils/gtag";
import Bugsnag from "../utils/Bugsnag";
import ErrorView from "../components/ErrorView";
import Layout from "../components/Layout";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";
import useGetBrandColor from "../hooks/useGetBrandColor";

const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

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
  const brandColor = useGetBrandColor();
  const themeWithBrand = {
    ...theme,
    colors: { ...theme.colors, brand: brandColor },
  };

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
    <SafeHydrate ssr={false}>
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
      <ChakraProvider theme={themeWithBrand}>
        <CSSReset />
        <Layout>
          <ErrorBoundary FallbackComponent={ErrorView}>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Layout>
      </ChakraProvider>
    </SafeHydrate>
  );
}

export default MyApp;
