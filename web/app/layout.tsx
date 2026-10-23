import type { Metadata } from "next";
import localFont from "next/font/local";
import DemoNotice from "./components/DemoNotice";
import "./globals.css";

const description =
  "Second hand premium fashion — projeto demonstrativo de e-commerce desenvolvido pela G9 CODE.";

export const metadata: Metadata = {
  title: "The Lucky Club",
  description,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://the-lucky-club-site.vercel.app"
  ),

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },

  openGraph: {
    title: "The Lucky Club",
    description:
      "Second hand premium fashion — projeto demonstrativo de e-commerce desenvolvido pela G9 CODE.",
    url: "/",
    siteName: "The Lucky Club",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

const perandory = localFont({
  src: [
    {
      path: "../public/fonts/Perandory-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Perandory-Condensed.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Perandory-Semi-Condensed.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-perandory",
  display: "swap",
});

const vintageGoods = localFont({
  src: "../public/fonts/Vintage Goods.otf",
  variable: "--font-vintage",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${perandory.variable} ${vintageGoods.variable}`}
      >
        <DemoNotice />
        {children}
      </body>
    </html>
  );
}
