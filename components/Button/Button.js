import styles from "./Button.module.css";

export default function Button({
  children,
  bg = "#CCFF00",
  onClick = () => {},
}) {
  return (
    <button
      className={styles.button}
      style={{ backgroundColor: bg }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
