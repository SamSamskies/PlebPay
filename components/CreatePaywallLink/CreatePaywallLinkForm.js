import {
  Heading,
  Text,
  Box,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  Link,
  Avatar,
  useBreakpointValue,
} from "@chakra-ui/react";
import Button from "../Button";
import Input from "../Input";
import StrikeMeLink from "./StrikeMeLink";

export default function CreatePaywallLinkForm({
  avatarUrl,
  username,
  currency,
  isLoading,
  onSubmit,
}) {
  const avatarSize = useBreakpointValue({ base: "md", sm: "lg" });
  const usernameSize = useBreakpointValue({ base: "2xl", sm: "3xl" });

  return (
    <Box>
      <HStack space={4} alignItems="flex-end" mb={4}>
        {avatarUrl && (
          <Avatar src={avatarUrl} name={username} size={avatarSize} />
        )}
        <Heading as="h1" size={usernameSize} mb={4}>
          {username}
        </Heading>
      </HStack>
      <Text mb={16}>
        Customize your paywall settings. All funds will be converted and
        credited to <StrikeMeLink username={username} />.
      </Text>
      <form onSubmit={onSubmit}>
        <VStack spacing={4} mb={2}>
          <FormControl>
            <FormLabel>{`Price (${currency})`}</FormLabel>
            <Input
              type="number"
              name="amount"
              min={0.01}
              max={100}
              step="0.01"
              placeholder="0.01"
              autoFocus
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Title </FormLabel>
            <Input
              name="title"
              placeholder="Check out my new video!"
              pattern="^.{1,50}$"
              title="Max 50 chars."
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Redirect URL </FormLabel>
            <Input
              name="redirectUrl"
              placeholder="https://bit.ly/3nG8cak"
              pattern="^.{1,120}$"
              title="Max 120 chars."
              required
            />
          </FormControl>
        </VStack>
        <Text fontSize="xs" color="face.tertiary" mb={8}>
          By clicking &quot;Create Paywall,&quot; you agree to our{" "}
          <Link href="https://strike.me/legal/tos/" isExternal>
            Terms
          </Link>{" "}
          and{" "}
          <Link href="https://strike.me/legal/privacy/" isExternal>
            Privacy Notice
          </Link>
          .
        </Text>
        <Button isLoading={isLoading} type="submit">
          Create Paywall
        </Button>
      </form>
    </Box>
  );
}
