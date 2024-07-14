import type { Metadata } from "next";
import "./globals.css";

import ClientWrapper from "@/components/common/client-wrapper";

export const metadata: Metadata = {
  title: "SD Matrimony",
  description: "",
};

type props = Readonly<{
  children: React.ReactNode;
}>

function RootLayout({ children }: props) {
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

export default RootLayout