/*
_document.tsx
AUTHORS: NA, FC, VD, RK, AP
LAST EDITED: 6-3-2024
DESCRIPTION: _document.tsx: Describes the document component. It defines the HTML document that is rendered on the server
*/

// import { Html, Head, Main, NextScript } from 'next/document'

// export default function Document() {
//   return (
//     <Html lang="en">
//       <Head />
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   )
// }

import { Html, Head, Main, NextScript } from "next/document";

// Defines the document components
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
