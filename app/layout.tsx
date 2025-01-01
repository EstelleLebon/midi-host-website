import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/server/Header";
import SessionProviderWrapper from "@/src/components/client/SessionProviderWrapper";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "XIV MIDIs Library",
    description: "MIDIs hosting website for FFXIV bards.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} font-sans ${geistMono.variable} antialiased`}>
                <SessionProviderWrapper>
                    <Header />
                    {children}
                </SessionProviderWrapper>
            </body>
        </html>
    );
}
