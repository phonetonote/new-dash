import { Box, useColorModeValue } from "@chakra-ui/react";
import type { NextPage } from "next";
import { PageWithLayout } from "../types/PageWithLayout";
import WithSidebar from "../components/layouts/WithSidebar";

const Dashboard: NextPage = (props) => {
  return (
    <Box pb={4} pt={16}>
      a very new dash
    </Box>
  );
};

(Dashboard as PageWithLayout).layout = WithSidebar;

export default Dashboard;
