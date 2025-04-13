import Loading from "./loading";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import { QuizProvider } from "./context/quiz-context";
import { fetchQuizData } from "./fetchData/page";
import Navbar from "./components/Navbar";

const tiny = localFont({
  src: "/fonts/Tiny5-Regular.ttf",
  variable: "--tiny-font",
  display: "swap",
});

const inter = Inter({
  variable: "--inter-font",
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Next Quiz",
  description: "My next Quiz app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const quizData = await fetchQuizData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${tiny.variable} antialiased font-[inter]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QuizProvider initialData={quizData}>
            <Navbar />
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </QuizProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
