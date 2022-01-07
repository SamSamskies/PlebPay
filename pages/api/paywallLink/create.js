import createInvoice from "../../../utils/strikeApi/createInvoice";

export default async function handler(req, res) {
  res.status(200).json(await createInvoice(req.body));
}
