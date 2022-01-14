import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import customTheme from "../styles/themes";
import { ClerkProvider } from "@clerk/nextjs";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { PageWithLayout } from "../types/PageWithLayout";
import React from "react";

type AppLayoutProps = {
  Component: PageWithLayout;
  pageProps: any;
};

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const Layout = Component.layout;

  return (
    <ChakraProvider theme={customTheme}>
      <ClerkProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ClerkProvider>
    </ChakraProvider>
  );
}

export default MyApp;
