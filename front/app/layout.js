'use client'
import "./globals.css";
import GlobalProvider from "@/app/providers/GlobalProvider";
import Navbar from "@/app/navbars/Navbar";


// export const metadata = {
//   title: "SZYSZKA App",
//   description: "SZYSZKA App",
// };

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
