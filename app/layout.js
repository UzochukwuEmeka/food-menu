import { Inter, Permanent_Marker } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner"




const inter = Inter({ subsets: ["latin"] });
const permanent = Permanent_Marker({ weight: '400', subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={permanent.className}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
