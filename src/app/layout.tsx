import type { Metadata } from "next";
import "./globals.css";

import ClientWrapper from "@/components/common/client-wrapper";

export const metadata: Metadata = {
  title: "SD Matrimony",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
