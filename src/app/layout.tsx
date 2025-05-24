import Loading from "./loading";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import { QuizProvider } from "./context/quiz-context";
import { fetchQuizData } from "./fetchData/fetchQuizData";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Wrapper from "./components/wrapper/Wrapper";

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${tiny.variable} antialiased font-[inter] relative`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QuizProvider initialData={quizData}>
              <Navbar />
              <Wrapper>
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </Wrapper>
            </QuizProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
