import type { Metadata } from "next";
import { Source_Serif_4, Hanken_Grotesk, Figtree, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AppBar } from "@/components/custom/appbar";
import { Footer } from "@/components/custom/footer";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";
import { Analytics } from "@vercel/analytics/next";

const spaceGroteskHeading = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' });

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif-4",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SavaPack | Sustainable Material Honesty",
  description:
    "Premium, plastic-free shipping solutions designed for the conscious modern brand. Biodegradable, compostable, and beautifully textured.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("scroll-smooth", sourceSerif4.variable, hankenGrotesk.variable, "font-sans", inter.variable, spaceGroteskHeading.variable)}
      data-scroll-behavior="smooth"
    >
      <body className="bg-surface text-on-surface font-body-md overflow-x-hidden">
        <div className="fixed inset-0 grain-texture z-50"></div>
        <AppBar />
        <Providers>{children}</Providers>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
