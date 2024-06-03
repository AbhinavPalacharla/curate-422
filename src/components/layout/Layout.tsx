/*
Layout.tsx
AUTHORS: NA, FC, VD, RK, AP
LAST EDITED: 6-3-2024
DESCRIPTION: Layout.tsx: Describes the layout of the page. This allows the application to have a
common visual theme among the different pages.
*/

import { Navbar, Footer } from "@/components/navigation";
import { Inter } from "next/font/google";
import type { NextPage } from "next";

// const inter = Inter();

// initializes the Inter font
const inter = Inter({ subsets: ["latin"] });

// layout options types
type options = {
  navbar: boolean;
  footer: boolean;
};

// adds layout options to the next page
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & options;

// Describes the React Functional Component called Layout
const Layout: React.FC<{
  children: React.ReactNode;
  options: options;
}> = ({ children, options: { navbar, footer } }) => {
  return (
    <div className={inter.className}>
      <meta
        name="theme-color"
        content={
          "#000000, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        }
        style={{ backgroundColor: "#000000" }}
      />
      <div className="bg-black h-screen relative">
        {navbar && ( // makes sure that navbar is true
          <div className="fixed top-0 left-0 right-0">
            <Navbar />
          </div>
        )}

        {/* <div className="sm:px-2 md:px-12 lg:px-48 sm:flex sm:flex-row sm:items-center">
          {children}
        </div> */}
        <div className="px-2 md:px-12 lg:px-40">{children}</div>

        {footer && ( // Makes sure that footer is true
          <div className="fixed bottom-0 left-0 right-0">
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export { Layout };
