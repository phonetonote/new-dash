import { Box, Flex, useColorModeValue as mode } from "@chakra-ui/react";
import colors from "../../styles/themes/colors";
import Link from "next/link";
import { chakra } from "@chakra-ui/react";
import { NavContent } from "./NavContent";

export const Topbar = () => {
  return (
    <Box
      as="header"
      bg={mode("white", "black")}
      position="relative"
      zIndex="10"
      py={0}
    >
      <Box
        as="nav"
        aria-label="main navigation"
        maxW="7xl"
        mx="auto"
        px={{ base: "3", md: "5" }}
        pt={1}
      >
        <NavContent.Mobile display={{ base: "flex", lg: "none" }} />
        <NavContent.Desktop display={{ base: "none", lg: "flex" }} />
      </Box>
    </Box>
  );
};
