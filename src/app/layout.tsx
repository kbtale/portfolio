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
};

import { ThemeProvider } from "@/app/providers/ThemeContext";
import SmoothScroller from "@/shared/ui/SmoothScroller/SmoothScroller";
import LanguageTransitionProvider from "@/shared/ui/LanguageTransition/LanguageTransition";
import LoadingScreen from "@/shared/ui/LoadingScreen/LoadingScreen";
import { GitHubStarsProvider } from "@/app/providers/GitHubStarsContext";

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
