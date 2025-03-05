import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_Thai_Looped } from "next/font/google";
import { Toaster } from "sonner";

const notoSansThaiLooped = Noto_Sans_Thai_Looped({
  subsets: ["thai"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Booking | Mongkol Clinic",
  description: "A booking system for Mongkol Clinic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSansThaiLooped.className}>
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
