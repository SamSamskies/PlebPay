import { useRouter } from "next/router";

const useGetBrandColor = () => {
  const { pathname, query } = useRouter();
  const brandColor = pathname === "/[invoiceId]" && query.brandColor;

  return brandColor || "#CCFF00";
};

export default useGetBrandColor;
