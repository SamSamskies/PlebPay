import { useRouter } from "next/router";

export default function CreateInvoice() {
  const { query, isReady } = useRouter();

  return isReady ? <h1>{query.username}</h1> : null;
}
