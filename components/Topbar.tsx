import { Box, Flex, useColorModeValue as mode } from "@chakra-ui/react";
import colors from "../styles/themes/colors";
import { NavBreadcrumb } from "./NavBreadcrumb";
import Link from "next/link";
import { chakra } from "@chakra-ui/react";

export const Topbar = () => {
  return (
    <Box
      height="10vh"
      as="nav"
      width="100%"
      bg={mode("gray.100", "black")}
      borderBottom={`1px solid ${mode(
        `${colors.gray["200"]}`,
        `${colors.gray["900"]}`
      )}`}
      p="4"
      top="0"
      zIndex={1}
      display={{ base: "none", md: "flex" }}
      alignItems="center"
    >
      <Link href="/" passHref>
        {/* bookmark 🔖 hover and active states */}
        <chakra.a mr={4}>
          <chakra.img src="images/logo.svg" alt="logo" width={12} />
        </chakra.a>
      </Link>
      <NavBreadcrumb />
    </Box>
  );
};
