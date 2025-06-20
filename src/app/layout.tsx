import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";


export const metadata: Metadata = {
  title: "Home Rental",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar/>
        <div className="flex-1 flex flex-col min-h-0 justify-center">
          <div className="flex flex-1">{children}</div>
          <BottomNav/>
        </div>
      </body>
    </html>
  );
}
