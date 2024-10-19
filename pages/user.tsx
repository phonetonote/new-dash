import { Box } from "@chakra-ui/react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import type { NextPage } from "next";
import { DashboardArea } from "../components/areas/DashboardArea";
import { SignedOutArea } from "../components/areas/SignedOutArea";
import { UserArea } from "../components/areas/UserArea";
import WithSidebar from "../components/layouts/WithSidebar";
import { PageWithLayout } from "../types/PageWithLayout";

const User: NextPage = (props) => {
  return (
    <Box>
      <SignedIn>
        <UserArea></UserArea>
      </SignedIn>
      <SignedOut>
        <SignedOutArea />
      </SignedOut>
    </Box>
  );
};

(User as PageWithLayout).layout = WithSidebar;

export default User;
