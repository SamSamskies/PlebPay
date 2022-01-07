import { useRouter } from "next/router";
import Image from "next/image";
import Button from "../Button";

export default function CreateInvoice({ avatarUrl }) {
  const { query, isReady } = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return isReady ? (
    <div>
      {avatarUrl && (
        <Image src={avatarUrl} alt="user avatar" width="100%" height="100%" />
      )}
      <h1>{query.username}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Amount{" "}
            <input
              type="number"
              name="amount"
              step="0.01"
              style={{ width: 64 }}
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Title <input name="title" style={{ width: 400 }} />
          </label>
        </div>
        <br />
        <div>
          <label>
            Redirect URL <input name="redirectUrl" style={{ width: 400 }} />
          </label>
        </div>
        <br />
        <Button>Submit</Button>
      </form>
    </div>
  ) : null;
}
