import createPaywallLink from "../../../utils/strikeApi/createPaywallLink";

export default async function handler(req, res) {
  res.status(200).json(await createPaywallLink(req.body, req.headers.origin));
}
