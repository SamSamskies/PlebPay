import useSWR from "swr";
import fetchInvoiceById from "../utils/fetchInvoiceById";

const useInvoiceStatePoller = (invoiceId) => {
  const { data, error } = useSWR(
    invoiceId ? invoiceId : null,
    fetchInvoiceById,
    { refreshInterval: 5000 }
  );

  if (error) {
    console.log(error);
  }

  return data?.state;
};

export default useInvoiceStatePoller;
