import { NextPage } from "next";

export type LayoutProps = {
  children: React.ReactNode;
};

export type PageWithLayout = NextPage & {
  layout: React.FunctionComponent<LayoutProps>;
};
