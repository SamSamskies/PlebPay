import { useEffect, useRef } from "react";
import qrCodeConfig from "./qrCodeConfig";
import styles from "./QRCode.module.css";

export default function QRCode({ data, animationDuration }) {
  const ref = useRef();

  useEffect(() => {
    qrCodeConfig.append(ref.current);
  }, []);

  useEffect(() => {
    qrCodeConfig.update({ data });
  }, [data]);

  return (
    <div className={styles.root}>
      <div className={styles.svgBorderContainer}>
        <svg width="240px" height="240px" viewBox="0 0 240 240">
          <rect
            x="2"
            y="2"
            width="236"
            height="236"
            fill="none"
            stroke="#CCFF00"
            strokeWidth="4"
            rx="28"
          />
        </svg>
        <svg width="240px" height="240px" viewBox="0 0 240 240">
          <rect
            x="2"
            y="2"
            width="236"
            height="236"
            fill="none"
            stroke="black"
            strokeWidth="6"
            strokeDashoffset={960}
            strokeDasharray={960}
            rx="28"
            style={{ animationDuration: `${animationDuration}s` }}
          />
        </svg>
      </div>
      <div className={styles.qrCodeContainer} ref={ref} />
    </div>
  );
}
