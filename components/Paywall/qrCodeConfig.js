import QRCodeStyling from "qr-code-styling";

const qrCodeConfig = new QRCodeStyling({
  width: 192,
  height: 192,
  qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "L" },
  imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
  dotsOptions: { type: "rounded", color: "#ffffff" },
  backgroundOptions: { color: "#1A1A1A" },
  image: null,
  dotsOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: "#6a1a4c",
      color2: "#6a1a4c",
      rotation: "0",
    },
  },
  cornersSquareOptions: { type: "extra-rounded", color: "#ffffff" },
  cornersSquareOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: "#000000",
      color2: "#000000",
      rotation: "0",
    },
  },
  cornersDotOptions: { type: "", color: "#ffffff" },
  cornersDotOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: "#000000",
      color2: "#000000",
      rotation: "0",
    },
  },
  backgroundOptionsHelper: {
    colorType: { single: true, gradient: false },
    gradient: {
      linear: true,
      radial: false,
      color1: "#ffffff",
      color2: "#ffffff",
      rotation: "0",
    },
  },
});

export default qrCodeConfig;
