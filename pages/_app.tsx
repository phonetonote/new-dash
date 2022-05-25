import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import customTheme from "../styles/themes";
import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { PageWithLayout } from "../types/PageWithLayout";
import React from "react";
import "focus-visible/dist/focus-visible";
import Head from "next/head";

type AppLayoutProps = {
  Component: PageWithLayout;
  pageProps: any;
};

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const Layout = Component.layout;

  return (
    <>
      <Head>
        <title>ptn dashboard</title>
      </Head>
      <ChakraProvider theme={customTheme}>
        <ClerkProvider>
          <ClerkLoaded>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ClerkLoaded>
        </ClerkProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
