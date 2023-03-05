import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import EmptyPage from "../components/layouts/EmptyPage";
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
