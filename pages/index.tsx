import { Box, useColorModeValue } from "@chakra-ui/react";
import type { NextPage } from "next";
import { PageWithLayout } from "../types/PageWithLayout";
import WithTopbar from "../components/layouts/WithTopbar";

const Home: NextPage = (props) => {
  return (
    <Box pb={4} pt={16}>
      a very new home page experience
    </Box>
  );
};

(Home as PageWithLayout).layout = WithTopbar;

export default Home;
