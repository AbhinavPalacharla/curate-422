/*
_app.tsx
AUTHORS: NA, FC, VD, RK, AP
LAST EDITED: 6-3-2024
DESCRIPTION: _app.tsx: This is the root of the application and encompasses the client side of the application.
*/
        
import "@/styles/globals.css";

import type { NextPageWithLayout } from "@/components/layout";
import { Layout } from "@/components/layout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

// Defining the app component
export default function App({
  Component,
  pageProps,
}: AppProps & { Component: NextPageWithLayout }) {
  // Makes a new query for the app
  const queryClient = new QueryClient();

  // Renders the app component
  return (
    <QueryClientProvider client={queryClient}>
      <Layout options={{ navbar: Component.navbar, footer: Component.footer }}>
        <Component {...pageProps} />;
      </Layout>
    </QueryClientProvider>
  );
}
