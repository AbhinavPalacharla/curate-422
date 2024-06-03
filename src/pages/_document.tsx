/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: _documents.tsx: Sets up HTML layout for the 'document' used to hold the application. Includes icon, title, background color

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html style={{ backgroundColor: "#000000" }}>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/curatefavicon32.png"
        ></link>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/curatefavicon180.png"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
