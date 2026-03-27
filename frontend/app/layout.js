import "./globals.css";
import { Inter } from "next/font/google";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import SessionWrapper from "../components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ExcelToolsHQ",
  description: "Smart Excel tools for cleaning, converting and automating your workflows.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={inter.className}>
        <SessionWrapper>
          <div className="min-h-screen bg-[#f8fafc] text-slate-900">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}