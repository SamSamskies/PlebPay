# PlebPay ⚡️

**PlebPay was retired on October 1, 2026.** Thank you to everyone who used it.

PlebPay originally let people create Bitcoin Lightning paywalls for Strike users. Paywall creation, payments, and receipt verification are now disabled, and existing PlebPay links and integrations no longer work. The source remains available for reference.

## Retirement behavior

- The homepage and all former creation, paywall, and receipt pages display the retirement message.
- Every `/api` path, including unknown paths, returns **HTTP 410 Gone** for all request methods.
- API responses use `Cache-Control: no-store` and the following JSON body (HEAD requests return no body):

```json
{
  "error": "SERVICE_RETIRED",
  "message": "PlebPay has been retired. Paywall creation, payments, and receipt verification are no longer available."
}
```

The retired app does not call the Strike API or require API credentials. The previous maintenance-mode banner has been replaced by the retirement page.

## Run locally

Use Node.js **22.16.0**, as specified in `package.json`, and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the retirement page. No `.env.local` file is required.

To preview the production build:

```bash
npm run build
npm run start
```

## Maintain the retirement page

- [components/Home/Home.js](components/Home/Home.js) contains the retirement message.
- [components/Layout/Layout.js](components/Layout/Layout.js) and [components/Layout/Layout.module.css](components/Layout/Layout.module.css) define the page layout and metadata.
- [pages/index.js](pages/index.js) and [pages/[...path].js](pages/[...path].js) show the message at the homepage and former site URLs.
- [pages/api/[[...path]].js](pages/api/[[...path]].js) rejects all API requests before parsing request bodies or contacting Strike.

Check changes with:

```bash
npm run lint
npm run build
```

## License

[MIT](LICENSE)
