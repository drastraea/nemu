import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { auth } from "@/libs/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nemu",
  description: "Find your lost items with the power of AI",
};

const session = await auth();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex flex-col h-screen">
            <Nav auth={session} />
            <main className="flex-grow w-6/12 self-center">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
