import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import type { NextPage } from "next";
import { PageWithLayout } from "../types/PageWithLayout";
import WithSidebar from "../components/layouts/WithSidebar";
import { DashboardHeading } from "../components/headings/DashboardHeading";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import Analytics from "../helpers/analytics";
import mixpanel from "mixpanel-browser";

const Dashboard: NextPage = (props) => {
  const { user } = useUser({ withAssertions: true });

  useEffect(() => {
    const params = new URLSearchParams(`${window.location.search}`);
    if (params.get("signedUp") && user && user.id) {
      Analytics.identify(user.id);
      Analytics.track("loadedDashboardAfterSignup");
    }
  }, [Analytics, user]);

  return (
    <Box>
      <DashboardHeading>usage</DashboardHeading>
    </Box>
  );
};

(Dashboard as PageWithLayout).layout = WithSidebar;

export default Dashboard;
