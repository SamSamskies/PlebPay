import { useRouter } from "next/router";
import Image from "next/image";

export default function CreateInvoice({ avatarUrl }) {
  const { query, isReady } = useRouter();

  return isReady ? (
    <div>
      {avatarUrl && (
        <Image src={avatarUrl} alt="user avatar" width="100%" height="100%" />
      )}
      <h1>{query.username}</h1>
    </div>
  ) : null;
}
