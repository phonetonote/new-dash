import { Box } from "@chakra-ui/react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import type { NextPage } from "next";
import { DashboardArea } from "../components/areas/DashboardArea";
import { SignedOutArea } from "../components/areas/SignedOutArea";
import { UserArea } from "../components/areas/UserArea";
import EmptyPage from "../components/layouts/EmptyPage";
import WithSidebar from "../components/layouts/WithSidebar";
import { ApolloProviderWrapper } from "../helpers/apollo-client";
import { PageWithLayout } from "../types/PageWithLayout";

const Custom404: NextPage = (props) => {
  return (
    <Box>
      <h2>404 - Page not found</h2>
    </Box>
  );
};

(Custom404 as PageWithLayout).layout = EmptyPage;

export default Custom404;
