import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./lib/i18n";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shifman Inventory Manager",
    template: "%s | Shifman Inventory",
  },
  description:
    "Manage your inventory efficiently with Shifman Inventory Manager.",
  applicationName: "Shifman Inventory",
  generator: "Next.js",
  keywords: ["inventory", "management", "dashboard", "products", "Shifman"],
  authors: [{ name: "Iván Shifman", url: "https://github.com/ivanshifman" }],
  creator: "Iván Shifman",
  publisher: "Shifman Dev",
  icons: {
    icon: "/icon0.svg",
    shortcut: "/icon0.svg",
    apple: "/icon0.svg",
  },
  openGraph: {
    title: "Shifman Inventory Manager",
    description: "A powerful tool for managing product inventory in real time.",
    url: "https://inventory-management-shifman-1o2d.onrender.com",
    siteName: "Shifman Inventory",
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://inventory-management-shifman-1o2d.onrender.com"),
  alternates: {
    canonical: "/en",
    languages: {
      "en-US": "/en",
      "es-AR": "/es",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
