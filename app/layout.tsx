import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ishan Patel — Cybersecurity Portfolio",
  description:
    "Computer Information Systems student concentrating in Cybersecurity. Seeking cyber internships and a career in Sales Engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" style={{ colorScheme: "light" }}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
