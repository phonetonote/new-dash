import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import type { NextPage } from "next";
import { PageWithLayout } from "../types/PageWithLayout";
import WithSidebar from "../components/layouts/WithSidebar";
import { DashboardHeading } from "../components/headings/DashboardHeading";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import Analytics from "../helpers/analytics";
import mixpanel from "mixpanel-browser";
import { ApolloProviderWrapper } from "../helpers/apollo-client";
import { gql, useQuery } from "@apollo/client";
import { subscriptionQuery } from "../helpers/queries/subscription-query";
import { SubscriptionBadge } from "../components/widgets/SubscriptionBadge";
import { DashboardArea } from "../components/DashboardArea";

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
