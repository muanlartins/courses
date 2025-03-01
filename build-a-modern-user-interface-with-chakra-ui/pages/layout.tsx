import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chakra UI",
  description: "Build a Modern User Interface with Chakra UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
