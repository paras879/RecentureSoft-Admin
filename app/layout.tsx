import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
const RecentureAIWrapper = dynamic(() => import("@/components/ai/RecentureAIWrapper"));
import { ThemeProvider } from "@/components/ThemeProvider";
import RoutePreloader from "@/components/RoutePreloader";
import { ProjectModalProvider } from "@/components/providers/ProjectModalProvider";
import { MeetingModalProvider } from "@/components/providers/MeetingModalProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RecentureSoft | Enterprise Software Development",
  description: "RecentureSoft builds scalable enterprise software, AI products, web platforms, and mobile applications for global businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ProjectModalProvider>
            <MeetingModalProvider>
              <RoutePreloader />
              {children}
              <RecentureAIWrapper />
            </MeetingModalProvider>
          </ProjectModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
