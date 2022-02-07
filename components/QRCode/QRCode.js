import { useEffect, useRef } from "react";
import qrCodeConfig from "./qrCodeConfig";
import useGetBrandColor from "../../hooks/useGetBrandColor";
import styles from "./QRCode.module.css";

export default function QRCode({ data, animationDuration = 0 }) {
  const ref = useRef();
  const brandColor = useGetBrandColor();

  useEffect(() => {
    qrCodeConfig.append(ref.current);
  }, []);

  useEffect(() => {
    qrCodeConfig.update({ data });
  }, [data]);

  return (
    <div className={styles.root}>
      <div className={styles.svgBorderContainer}>
        <a href={`lightning:${data}`}>
          <svg width="240px" height="240px" viewBox="0 0 240 240">
            <rect
              x="2"
              y="2"
              width="236"
              height="236"
              fill="none"
              stroke={brandColor}
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
              stroke="#1A1A1A"
              strokeWidth="6"
              strokeDashoffset={960}
              strokeDasharray={960}
              rx="28"
              style={{ animationDuration: `${animationDuration}s` }}
            />
          </svg>
        </a>
      </div>
      <div className={styles.qrCodeContainer} ref={ref} />
    </div>
  );
}
