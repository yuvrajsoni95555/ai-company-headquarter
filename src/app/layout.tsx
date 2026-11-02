import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "AI Company Headquarters | Founder Control Center",
  description: "Autonomous enterprise management hierarchy for House of Jewelux and multi-company operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090d16] text-slate-100 min-h-screen antialiased flex">
        <AppProvider>
          {/* Main Navigation Sidebar */}
          <Sidebar />

          {/* Core Content Area */}
          <div className="flex-1 flex flex-col min-w-0 min-h-screen">
            <Header />
            <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
