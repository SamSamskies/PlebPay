// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import createInvoice from "../../utils/createInvoice";

export default async function handler(req, res) {
  res.status(200).json(await createInvoice(req.body));
}
