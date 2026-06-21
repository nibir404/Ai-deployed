import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Geist } from "next/font/google";
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

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-loaded",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-deployed.example.com"),
  title: {
    default: "AI Deployed — Enterprise AI Deployment, Transformation & Operationalization",
    template: "%s · AI Deployed",
  },
  description:
    "AI Deployed helps organizations deploy, integrate, operationalize, manage, and scale artificial intelligence, enterprise systems, cloud infrastructure, and modern technology platforms through embedded engineering expertise.",
  applicationName: "AI Deployed",
  keywords: [
    "AI Deployment",
    "Enterprise AI",
    "Generative AI",
    "AI Agents",
    "Systems Integration",
    "Cloud Infrastructure",
    "Digital Transformation",
    "Forward Deployed Engineers",
    "Managed Services",
    "Platform Engineering",
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
    title: "AI Deployed — Enterprise AI Deployment, Transformation & Operationalization",
    description:
      "Embedded engineering expertise for organizations deploying, integrating, and operationalizing modern technology at scale.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Deployed",
    description:
      "Embedded engineering expertise for organizations deploying, integrating, and operationalizing modern technology at scale.",
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
