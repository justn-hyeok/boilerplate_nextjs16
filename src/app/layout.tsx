import type { ReactNode } from "react";

import { Providers } from "./providers";

import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Jagalchi",
  description: "Collaborative flow-chart editor",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
