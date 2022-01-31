import { Box } from "@chakra-ui/react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import type { NextPage } from "next";
import { DashboardArea } from "../components/areas/DashboardArea";
import { SignedOutArea } from "../components/areas/SignedOutArea";
import { UserArea } from "../components/areas/UserArea";
import WithSidebar from "../components/layouts/WithSidebar";
import { ApolloProviderWrapper } from "../helpers/apollo-client";
import { PageWithLayout } from "../types/PageWithLayout";

const User: NextPage = (props) => {
  return (
    <Box>
      <SignedIn>
        <ApolloProviderWrapper>
          <UserArea></UserArea>
        </ApolloProviderWrapper>
      </SignedIn>
      <SignedOut>
        <SignedOutArea />
      </SignedOut>
    </Box>
  );
};

(User as PageWithLayout).layout = WithSidebar;

export default User;
