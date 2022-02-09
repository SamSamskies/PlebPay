import createPaywallLink from "utils/strikeApi/createPaywallLink";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      res
        .status(200)
        .json(await createPaywallLink(req.body, req.headers.origin));
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
