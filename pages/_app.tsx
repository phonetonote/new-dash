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
import Script from "next/script";

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
              <>
                <Component {...pageProps} />
                <Script
                  id="rewardful-1"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`,
                  }}
                />
                <Script
                  id="rewardful-2"
                  strategy="afterInteractive"
                  async
                  src="https://r.wdfl.co/rw.js"
                  data-rewardful="7d155f"
                />
              </>
            </Layout>
          </ClerkLoaded>
        </ClerkProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
