import type { Metadata } from "next";
import { Averia_Serif_Libre, Kameron, Sanchez } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";

const kameron = Kameron({
  variable: "--font-kameron",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const averiaSerifLibre = Averia_Serif_Libre({
  variable: "--font-averia",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const sanchez = Sanchez({
  variable: "--font-sanchez",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Carlos Bolívar - Portfolio",
  description: "Welcome to my portfolio, a developer one!",
  icons: {
    icon: '/C.ico',
  },
};

import { ThemeProvider } from "../components/ThemeContext";
import SmoothScroller from "../components/SmoothScroller";
import LanguageTransitionProvider from "../components/LanguageTransition";
import LoadingScreen from "../components/LoadingScreen";
import { GitHubStarsProvider } from "../components/GitHubStarsContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${kameron.variable} ${averiaSerifLibre.variable} ${sanchez.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <LoadingScreen />
            <LanguageTransitionProvider>
              <GitHubStarsProvider>
                <SmoothScroller />
                {children}
              </GitHubStarsProvider>
            </LanguageTransitionProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
