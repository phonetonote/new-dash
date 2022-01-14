import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import type { NextPage } from "next";
import { PageWithLayout } from "../types/PageWithLayout";
import WithSidebar from "../components/layouts/WithSidebar";
import { DashboardHeading } from "../components/headings/DashboardHeading";

const Dashboard: NextPage = (props) => {
  return (
    <Box>
      <DashboardHeading>usage</DashboardHeading>
    </Box>
  );
};

(Dashboard as PageWithLayout).layout = WithSidebar;

export default Dashboard;
