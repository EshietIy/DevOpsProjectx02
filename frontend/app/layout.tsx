'use client'
import {Providers} from "./provider";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import React, {FC} from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";


const poppins = Poppins({
  variable: "--font-Poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const josefin = Josefin_Sans({
  variable: "--font-Josefin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
        <SessionProvider>
          <ThemeProvider attribute='class' defaultTheme="system" enableSystem>
          <Custom> {children}</Custom>
          <Toaster position="top-center" reverseOrder={false} />
        </ThemeProvider>
        </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

// this is the loader that displays on page load
const Custom: FC<{children: React.ReactNode}> = ({children}) => {
  const {isLoading} = useLoadUserQuery({});
  return (
  <>
  {
  isLoading ? <Loader/>: <>{children}</>
  }
  </>
  )
}