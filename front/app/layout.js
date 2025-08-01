<<<<<<< HEAD
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
=======
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
>>>>>>> 61f82326b5d5157790318d24f16b57e55aeb24b1
