import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import customTheme from "../styles/themes";
import { ClerkProvider } from "@clerk/nextjs";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <ClerkProvider>
        <Component {...pageProps} />
      </ClerkProvider>
    </ChakraProvider>
  );
}

export default MyApp;
