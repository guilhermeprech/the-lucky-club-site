# The Lucky Club

A premium second-hand fashion storefront built with Next.js, React and TypeScript. This portfolio project demonstrates a complete browsing-to-checkout experience with an editorial visual identity and a responsive interface in Brazilian Portuguese.

[Live demo](https://the-lucky-club-site.vercel.app) · [Portfolio](https://guilhermerech.com.br) · [LinkedIn](https://www.linkedin.com/in/guilherme-pasquali-rech-446a92355)

![The Lucky Club preview](web/public/og-image.png)

> Portfolio demonstration: no real sales, payments, orders or messages are processed.

## Features

- Product catalog with search by name or brand and category filters.
- Individual product pages with image galleries.
- Shopping bag with quantities, item removal and totals persisted in browser localStorage.
- Simulated checkout with payment-method selection and an order confirmation.
- Simulated clothing resale form.
- Responsive layouts, local fonts, WebP product images and social sharing metadata.
- Search indexing discouraged through robots metadata and response headers.

## Technology and architecture

- **Next.js App Router** for routing, layouts and product pages.
- **React and TypeScript** for interactive components and typed product data.
- **Tailwind CSS** for styling and responsive layouts.
- **Local JSON catalog** and bundled images, with no database or external API required by the current demo.
- **Vercel** for the hosted demonstration.

The original catalog was exported from Supabase. The portfolio version reads products locally through `web/src/lib/products.ts`; client components handle filtering, the shopping bag and simulated forms.

## Run locally

Requires **Node.js 24.x** and npm. If you use nvm, run `nvm use` first.

From the repository root:

```bash
npm install
npm run dev
```

Open http://localhost:3000. The root install script installs the app dependencies inside `web/`.

No environment variables are required. To override the URL used for metadata, optionally create `web/.env.local`:

```dotenv
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Variables prefixed with `NEXT_PUBLIC_` are public browser configuration; never put secrets in them. Local environment files are ignored by Git.

## Quality checks and production build

Run from the repository root:

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

`start` serves the production build after `build` succeeds.

## Project structure

```text
web/
  app/                 Routes, shared components and global styles
  src/data/            Local product catalog
  src/lib/             Product access, cart persistence and formatting
  public/              Product images, fonts and sharing assets
```

## Demo scope

Shopping bag data stays in the browser. Checkout and resale submissions are simulated without sending form data to a backend. Authentication, inventory synchronization, real payments and order fulfillment are outside the scope of this demo.

## Author and assets

Developed by **Guilherme Rech — G9 CODE**.

Images, fonts and brand assets are included for this project’s presentation. This repository does not grant a separate license to reuse third-party assets.
