import LoadingSpinner from "../LoadingSpinner";
import styles from "./Button.module.css";

export default function Button({
  children,
  bg = "#CCFF00",
  onClick = () => {},
  isLoading,
}) {
  return (
    <button
      className={styles.button}
      style={{ backgroundColor: bg }}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
}
