import { useState } from "react";
import { useRouter } from "next/router";
import createPaywallLink from "../../utils/createPaywallLink";
import styles from "./CreatePaywallLink.module.css";
import CreatePaywallLinkForm from "./CreatePaywallLinkForm";
import CreatePaywallLinkSuccess from "./CreatePaywallLinkSuccess";

export default function CreatePaywallLink({
  avatarUrl,
  currencies = [],
  error,
  canReceive,
}) {
  const { query, isReady } = useRouter();
  const [paywallLink, setPaywallLink] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const currency = currencies.find(
    ({ isDefaultCurrency }) => isDefaultCurrency
  )?.currency;
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const paywallLink = await createPaywallLink({
      username: query.username,
      title: e.target.title.value,
      currency,
      amount: e.target.amount.value,
      redirectUrl: e.target.redirectUrl.value,
    });

    setPaywallLink(paywallLink);
    setIsLoading(false);
  };

  return isReady ? (
    <div className={styles.root}>
      {error?.status === 404 && (
        <h1>Doh! There is no Strike user with username {query.username}.</h1>
      )}
      {!error && !canReceive && (
        <h1>
          Doh! {query.username} currently can&apos;t create paywalls. Strike
          accounts must be public in order to create paywalls.
        </h1>
      )}
      {!error && !paywallLink && canReceive && (
        <CreatePaywallLinkForm
          avatarUrl={avatarUrl}
          username={query.username}
          currency={currency}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      )}
      {paywallLink && canReceive && (
        <CreatePaywallLinkSuccess
          username={query.username}
          paywallLink={paywallLink}
        />
      )}
    </div>
  ) : null;
}
