import { useRouter } from "next/router";
import Color from "color";

const useGetBrandColor = () => {
  const { pathname, query } = useRouter();
  const defaultBrandColor = "#CCFF00";
  const brandColor = query.brandColor;

  if (pathname !== "/[invoiceId]" || !brandColor) {
    return defaultBrandColor;
  }

  if (brandColor?.toLowerCase() === "bitcoin") {
    return "#ff9900";
  }

  try {
    Color(brandColor);

    return brandColor;
  } catch (e) {
    try {
      Color(`#${brandColor}`);

      return `#${brandColor}`;
    } catch (e) {}
  }

  return defaultBrandColor;
};

export default useGetBrandColor;
