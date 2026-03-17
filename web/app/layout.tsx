import localFont from "next/font/local";
import "./globals.css";

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
    <html lang="en">
      <body className={`${perandory.variable} ${vintageGoods.variable}`}>
        {children}
      </body>
    </html>
  );
}