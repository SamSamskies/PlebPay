import { Link } from "@chakra-ui/react";

export default function StrikeMeLink({ username }) {
  return <Link href={`https://strike.me/${username}`}>{username}</Link>;
}
