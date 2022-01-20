import Image from "next/image";
import copy from "copy-to-clipboard";
import toast from "react-simple-toasts";
import StrikeMeLink from "./StrikeMeLink";
import styles from "./CreatePaywallLinkSuccess.module.css";
import IconButton from "../IconButton/IconButton";

export default function CreatePaywallLinkSuccess({ username, paywallLink }) {
  return (
    <div className={styles.root}>
      <h1>All good 💪</h1>
      <p>
        Share this link and get paid. All funds will be converted and instantly
        credited to <StrikeMeLink username={username} />.
      </p>
      <div className={styles.paywallLinkContainer}>
        <input value={paywallLink} readOnly />
        <IconButton
          onClick={() => {
            copy(paywallLink);
            toast("Paywall link copied to clipboard 🎉");
          }}
        >
          <Image
            src="/copy.png"
            alt="copy icon"
            layout="fixed"
            width={19}
            height={20}
          />
        </IconButton>
      </div>
    </div>
  );
}
