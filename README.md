# PlebPay ⚡️

Create a paywall link for any [Strike](https://strike.me/) user. You specify the amount, title, and redirect URL and that's it. Takes like 10 seconds to create one. Try it out https://plebpay.com.

You can set a brand color for your paywall by adding a `brandColor` query param to your paywall link. You can use any valid CSS color value. You can also set the value to `bitcoin` which will set the brand color to the Bitcoin orange. 

Here's some examples:
* https://plebpay.com/ccc2c527-8c1c-4b74-9419-f040f3b61fa8?brandColor=bitcoin
* https://plebpay.com/2f077162-47ac-4d1c-96ee-7ed2491b76f5?brandColor=865efc 
* https://plebpay.com/21cbff55-2407-4394-a727-c8ed67dd5ab8?brandColor=deepskyblue



PlebPay is an example of an app that you can build quickly using the [Strike API](https://developer.strike.me).

The [plebpay-utils](https://www.npmjs.com/package/plebpay-utils) package can be used to protect a site with a specific PlebPay paywall.

A simple example of a site protected by a PlebPay paywall https://protected-by-plebpay-example.vercel.app/.

## Getting Started with Development

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation
```bash
npm install
```

### Environment Variables
For local development, create a file called `.env.local` and add your Strike API key there. Take a look at the `env.local.example` to see required as well as optional env vars.

### Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
