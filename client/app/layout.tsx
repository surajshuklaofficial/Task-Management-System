import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/global/userContext";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const updateUser = (user: UserType | null) => {
  //   setUser(user);
  // };

  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          {children}
          {/* <Footer /> */}
        </body>
      </UserProvider>
    </html>
  );
}
