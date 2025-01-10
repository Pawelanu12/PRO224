'use client'
import localFont from "next/font/local";
import "./globals.css";
import GlobalProvider from "@/app/providers/GlobalProvider";


// export const metadata = {
//   title: "SZYSZKA App",
//   description: "SZYSZKA App",
// };

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
