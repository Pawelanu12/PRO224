import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/app/providers/GlobalProvider";
export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body >
        <GlobalProvider>
            {children}
        </GlobalProvider>
        </body>
        </html>
    );
}