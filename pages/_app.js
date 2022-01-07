import Layout from "../components/Layout";
import "../styles/globals.css";

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <SafeHydrate>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SafeHydrate>
  );
}

export default MyApp;
