import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import Container from "@/components/layout/container";
 
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
});
 
export const metadata: Metadata = {
  title: "MD Todo",
  description: "MD Todo",
};
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className + " mb-16"}>
        <Header />
        <Container>{children}</Container>
      </body>
    </html>
  );
}