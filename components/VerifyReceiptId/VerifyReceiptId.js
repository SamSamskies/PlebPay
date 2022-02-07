import { useState } from "react";
import {
  Heading,
  Text,
  FormControl,
  FormLabel,
  Stack,
  Box,
} from "@chakra-ui/react";
import Button from "../Button";
import Input from "../Input";
import fetchInvoiceById from "../../utils/fetchInvoiceById";

export default function Home({ invoiceId, title }) {
  const [isLoading, setIsLoading] = useState(false);
  const [paidInvoice, setPaidInvoice] = useState(null);
  const [error, setError] = useState(null);
  const isValid =
    paidInvoice?.state === "PAID" && paidInvoice?.description === invoiceId;
  const isInvalid = (paidInvoice && !isValid) || error;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPaidInvoice(null);

    try {
      setPaidInvoice(await fetchInvoiceById(e.target.receiptId.value));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxW={388}>
      <Heading as="h1" size="3xl" mb={4}>
        {title}
      </Heading>
      <Text mb={16}>Verify receipt IDs.</Text>
      <form onSubmit={handleSubmit}>
        <Stack
          alignItems="flex-end"
          spacing={4}
          direction={{ base: "column", sm: "row" }}
        >
          <FormControl>
            <FormLabel>Receipt ID</FormLabel>
            <Input
              name="receiptId"
              placeholder="0772dff6-e71e-4d17-bc4a-dd65a31a486b"
              autoFocus
              required
              autoComplete="off"
            />
          </FormControl>
          <Button isLoading={isLoading} type="submit">
            Verify
          </Button>
        </Stack>
      </form>
      <Box mt={8}>
        {isValid && (
          <Text color="green" fontSize="3xl" fontWeight="bold">
            Valid Receipt ID 👍
          </Text>
        )}
        {isInvalid && (
          <Text color="red" fontSize="3xl" fontWeight="bold">
            Invalid Receipt ID 👎
          </Text>
        )}
      </Box>
    </Box>
  );
}
