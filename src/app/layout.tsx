import { Toaster } from "sonner";

import type { CSSProperties } from "react";
import type { Metadata } from "next";

import "./globals.css";

import ClientWrapper from "@/components/common/client-wrapper";

export const metadata: Metadata = {
  title: "SD Matrimony Demo | Find Your Perfect Match",
  description: "Connecting hearts, creating families. Your trusted partner in finding true love.",
}

function RootLayout({ children }: readOnlyChildren) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>

        <Toaster
          position="top-right"
          closeButton
          richColors
          style={{
            "--width": "300px",
            "--toast-close-button-start": "calc(100% - 2px)"
          } as CSSProperties}
        />
      </body>
    </html >
  );
}

export default RootLayout