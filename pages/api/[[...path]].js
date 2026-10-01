// Reject every API request before parsing a body or contacting Strike.
export const config = {
  api: { bodyParser: false },
};

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.status(410).json({
    error: "SERVICE_RETIRED",
    message:
      "PlebPay has been retired. Paywall creation, payments, and receipt verification are no longer available.",
  });
}
