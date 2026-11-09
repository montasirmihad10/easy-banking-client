import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import Providers from "@/lib/Providers/Providers";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-easybank",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "EasyBank",
  description: "Secure digital banking by EasyBank",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className={`${plusJakarta.className} antialiased`}>
        <AntdRegistry>
          <Providers>{children}</Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
