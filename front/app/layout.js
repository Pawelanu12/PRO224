'use client'
import "./globals.css";
import GlobalProvider from "@/app/providers/GlobalProvider";
import Navbar from "@/app/navbars/Navbar";
import {SessionProvider} from "next-auth/react";


// export const metadata = {
//   title: "SZYSZKA App",
//   description: "SZYSZKA App",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
      <SessionProvider>

          <GlobalProvider>
              <Navbar/>
            {children}
          </GlobalProvider>
      </SessionProvider>
      </body>
    </html>
  );
}
