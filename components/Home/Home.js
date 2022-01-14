import { useRouter } from "next/router";
import styles from "./Home.module.css";
import Button from "../Button";

export default function Home() {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/create/${e.target.username.value}`);
  };

  return (
    <div className={styles.root}>
      <h1>Strike Paywall</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Strike Username{" "}
          <input name="username" placeholder="jack" autoFocus required />
        </label>
        <Button>Let&apos;s Go!</Button>
      </form>
    </div>
  );
}
