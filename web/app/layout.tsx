import localFont from "next/font/local";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Lucky Club",
  description: "Second hand premium fashion",
  metadataBase: new URL("https://theluckyclub.com.br"),

  verification: {
    google: "c8YmN8aFY_j-3wFfcRgEjrCayBiJfkuY0g8NCC2sM0s",
  },

  openGraph: {
    title: "The Lucky Club",
    description: "Second hand premium fashion",
    url: "https://theluckyclub.com.br",
    siteName: "The Lucky Club",
    images: [
      {
        url: "https://theluckyclub.com.br/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  icons: {
    icon: "/icon.png",
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
        {children}
      </body>
    </html>
  );
}