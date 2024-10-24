import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../../styles/globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gamp Fitness",
  description: "Fitness tracker for Gamp Fitness challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} dark`}>{children}</body>
    </html>
  );
}
