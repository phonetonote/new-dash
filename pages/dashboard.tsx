import { Box } from "@chakra-ui/react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import type { NextPage } from "next";
import { DashboardArea } from "../components/areas/DashboardArea";
import WithSidebar from "../components/layouts/WithSidebar";
import { ApolloProviderWrapper } from "../helpers/apollo-client";
import { PageWithLayout } from "../types/PageWithLayout";
import { AreaStack } from "../components/areas/AreaStack";

const Dashboard: NextPage = (props) => {
  return (
    <Box>
      <SignedIn>
        <ApolloProviderWrapper>
          <DashboardArea></DashboardArea>
        </ApolloProviderWrapper>
      </SignedIn>
      {/* #TODO signedout */}

      <SignedOut>sign in to get started</SignedOut>
    </Box>
  );
};

(Dashboard as PageWithLayout).layout = WithSidebar;

export default Dashboard;
