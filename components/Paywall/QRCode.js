import { useEffect, useRef } from "react";
import qrCodeConfig from "./qrCodeConfig";
import styles from "./QRCode.module.css";

export default function QRCode({ data }) {
  const ref = useRef();

  useEffect(() => {
    qrCodeConfig.append(ref.current);
  }, []);

  useEffect(() => {
    qrCodeConfig.update({ data });
  }, [data]);

  return <div className={styles.root} ref={ref} />;
}
