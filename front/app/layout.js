'use client'
import "./globals.css";
import GlobalProvider from "@/app/providers/GlobalProvider";
import Navbar from "@/app/navbars/Navbar";
import {SessionProvider} from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
          <GlobalProvider>
              <Navbar/>
            {children}
          </GlobalProvider>

      </body>
    </html>
  );
}
