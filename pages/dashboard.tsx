import { Box } from "@chakra-ui/react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import type { NextPage } from "next";
import { DashboardArea } from "../components/DashboardArea";
import WithSidebar from "../components/layouts/WithSidebar";
import { ApolloProviderWrapper } from "../helpers/apollo-client";
import { PageWithLayout } from "../types/PageWithLayout";

const Dashboard: NextPage = (props) => {
  return (
    <Box>
      <SignedIn>
        <ApolloProviderWrapper>
          <DashboardArea></DashboardArea>
        </ApolloProviderWrapper>
      </SignedIn>
      <SignedOut>sign in to get started</SignedOut>
    </Box>
  );
};

(Dashboard as PageWithLayout).layout = WithSidebar;

export default Dashboard;
