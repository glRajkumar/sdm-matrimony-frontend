import { CSSProperties } from "react";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

import ClientWrapper from "@/components/common/client-wrapper";

export const metadata: Metadata = {
  title: "SD Matrimony",
  description: "",
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
    </html>
  );
}

export default RootLayout