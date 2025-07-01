import type { Metadata } from "next";
import { Noto_Sans, Public_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthContext";
import Auth from "@/components/Auth";
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-public-sans',
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans',
});

export const metadata: Metadata = {
  title: "Stashlog",
  description: "A private blog for authorized users only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${publicSans.variable} ${notoSans.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--background-color)]" style={{fontFamily: 'var(--font-public-sans), var(--font-noto-sans), sans-serif'}}>
        <AuthProvider>
          <Auth>
            {children}
          </Auth>
        </AuthProvider>
        <Analytics />
        <Script 
          src="https://cdn.tailwindcss.com?plugins=forms,container-queries"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}

