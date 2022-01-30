import { useState } from "react";
import { useRouter } from "next/router";
import { Heading, Box } from "@chakra-ui/react";
import createPaywallLink from "../../utils/createPaywallLink";
import CreatePaywallLinkForm from "./CreatePaywallLinkForm";
import CreatePaywallLinkSuccess from "./CreatePaywallLinkSuccess";

export default function CreatePaywallLink({
  avatarUrl,
  currencies = [],
  error,
  canReceive,
}) {
  const { query } = useRouter();
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

  return (
    <Box maxW={error || !canReceive ? 480 : 388}>
      {error?.status === 404 && (
        <Heading as="h1" size="2xl">
          Doh! There is no Strike user with username {query.username}.
        </Heading>
      )}
      {!error && !canReceive && (
        <Heading as="h1" size="2xl">
          Doh! {query.username} currently can&apos;t create paywalls. Strike
          accounts must be public in order to create paywalls.
        </Heading>
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
    </Box>
  );
}
