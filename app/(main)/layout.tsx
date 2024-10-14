import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import {CartProvider} from "@/lib/cartContext";
import {Toaster} from "@/components/ui/toaster";
import {UserProvider} from "@/context/userContext";
import {getUser} from "@/actions/users";
import Footer from "@/components/sections/Footer";
import {metaDataConfig} from "@/lib/utils";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = metaDataConfig();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = await getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className={`${inter.className} min-h-svh flex flex-col bg-background`}>
          <UserProvider initialUser={userData}>
            <CartProvider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <Navbar />
                <div className="flex-grow"> {children}</div>
                <Footer />
              </ThemeProvider>
              <Toaster />
            </CartProvider>
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
