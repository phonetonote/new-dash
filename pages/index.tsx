import { Box } from "@chakra-ui/react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import type { NextPage } from "next";
import { DashboardArea } from "../components/areas/DashboardArea";
import WithSidebar from "../components/layouts/WithSidebar";
import { PageWithLayout } from "../types/PageWithLayout";
import { AreaStack } from "../components/areas/AreaStack";
import { SignedOutArea } from "../components/areas/SignedOutArea";

const Home: NextPage = (props) => {
  return (
    <Box>
      <SignedIn>
        <DashboardArea></DashboardArea>
      </SignedIn>
      <SignedOut>
        <SignedOutArea />
      </SignedOut>
    </Box>
  );
};

(Home as PageWithLayout).layout = WithSidebar;

export default Home;
