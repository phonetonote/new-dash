import {
  Avatar,
  Box,
  Button,
  color,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { useColorModeValue as mode } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useMobileMenuState } from "../hooks/useMobileMenuState";
import {
  HiBookmark,
  HiOutlineInbox,
  HiPencil,
  HiSearchCircle,
} from "react-icons/hi";
import { MobileMenuButton } from "../components/MobileMenuButton";
import { NavBreadcrumb } from "../components/NavBreadcrumb";
import { NavSectionTitle } from "../components/NavSectionTitle";
import { ScrollArea } from "../components/ScrollArea";
import { UserInfo } from "../components/UserInfo";
import { SidebarLink } from "../components/SidebarLink";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import colors from "../styles/themes/colors";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

const Home: NextPage = (props) => {
  const color = mode("black", "white");
  const { isOpen, toggle } = useMobileMenuState();
  return (
    <>
      {/* <Topbar /> */}
      <Flex
        height="90vh"
        bg={mode("gray.200", "black")}
        overflow="hidden"
        sx={{ "--sidebar-width": "16rem" }}
      >
        <Sidebar />
        <Box
          flex="1"
          p={{ base: "0", md: "6" }}
          marginStart={{ md: "var(--sidebar-width)" }}
          position="relative"
          left={isOpen ? "var(--sidebar-width)" : "0"}
          transition="left 0.2s"
        >
          <Box
            maxW="2560px"
            bg={mode("white", "gray.900")}
            height="100%"
            pb="6"
            rounded={{ md: "lg" }}
          >
            <Flex direction="column" height="full">
              <Flex
                w="full"
                justify="space-between"
                align="center"
                px="10"
                py="2"
              >
                <Flex align="center">
                  <MobileMenuButton onClick={toggle} isOpen={isOpen} />
                </Flex>
              </Flex>
              <Flex direction="column" flex="1" overflow="auto" px="10" pt="8">
                <Heading size="md" fontWeight="extrabold" mb="6">
                  Product Vision
                </Heading>
                <Box
                  flex="1"
                  borderWidth="3px"
                  borderStyle="dashed"
                  rounded="xl"
                />
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Home;
