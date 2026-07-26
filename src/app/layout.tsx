import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/site/Header";
import { PageFooter } from "@/components/site/PageFooter";
import { ThemeScript } from "@/components/site/ThemeScript";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Cli } from "@/components/site/Cli";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body-loaded",
  weight: ["300", "400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-loaded",
  weight: ["400", "500"],
});

const geist = localFont({
  src: [
    { path: "../../public/fonts/geist/geist-sans-300.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/geist/geist-sans-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/geist/geist-sans-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/geist/geist-sans-600.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-display-loaded",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-deployed.example.com"),
  title: {
    default: "AI Deployed — Embedded AI and software, built and run for you",
    template: "%s · AI Deployed",
  },
  description:
    "AI Deployed embeds with your team to architect, build, deploy, and operationalize AI and software systems across cloud, private, and tightly controlled environments.",
  applicationName: "AI Deployed",
  keywords: [
    "AI Agents",
    "Embedded Engineering",
    "AI in Production",
    "AI Governance",
    "Cloud & On-Prem",
    "Approval Workflows",
    "Forward Deployed Engineers",
    "AI Operations",
    "Generative AI",
    "Enterprise AI",
  ],
  authors: [{ name: "AI Deployed" }],
  creator: "AI Deployed",
  publisher: "AI Deployed",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "AI Deployed",
    title: "AI Deployed — Embedded AI and software, built and run for you",
    description:
      "AI Deployed embeds with your team to architect, build, deploy, and operationalize AI and software systems across cloud, private, and tightly controlled environments.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Deployed — Embedded AI and software, built and run for you",
    description:
      "AI Deployed embeds with your team to architect, build, deploy, and operationalize AI and software systems across cloud, private, and tightly controlled environments.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${inter.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <ScrollProgress />
        <SmoothScroll />
        <main id="main">{children}</main>
        <PageFooter />
        <Cli />
      </body>
    </html>
  );
}
