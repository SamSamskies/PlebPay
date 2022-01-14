import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./Home.module.css";
import Button from "../Button";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        <Button isLoading={isLoading}>Let&apos;s Go!</Button>
      </form>
    </div>
  );
}
