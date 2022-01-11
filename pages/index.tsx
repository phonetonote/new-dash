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

const Home: NextPage = (props) => {
  const color = mode("black", "white");
  const { isOpen, toggle } = useMobileMenuState();
  return (
    <Flex
      height="100vh"
      bg={mode("gray.200", "black")}
      overflow="hidden"
      sx={{ "--sidebar-width": "16rem" }}
    >
      <Box
        as="nav"
        display="block"
        flex="1"
        width="var(--sidebar-width)"
        left="0"
        py="5"
        px="3"
        color="gray.200"
        position="fixed"
      >
        <Box fontSize="sm" lineHeight="tall">
          <Box
            as="a"
            href="#"
            p="3"
            display="block"
            transition="background 0.1s"
            rounded="xl"
            _hover={{ bg: "whiteAlpha.200" }}
            whiteSpace="nowrap"
          >
            <UserInfo name="Esther Collins" email="esther-colls@chakra.com" />
          </Box>
          <ScrollArea pt="5" pb="6">
            <Flex
              height={"100%"}
              direction={"column"}
              justifyContent={"space-between"}
            >
              <Box>
                <SidebarLink
                  display={{ base: "block", lg: "none" }}
                  mb="2"
                  icon={<HiSearchCircle />}
                >
                  Search
                </SidebarLink>
                <Stack pb="6">
                  <NavSectionTitle>Links</NavSectionTitle>

                  <SidebarLink icon={<HiOutlineInbox />}>Inbox</SidebarLink>
                  <SidebarLink icon={<HiBookmark />}>Bookmarks</SidebarLink>
                  <SidebarLink icon={<HiPencil />}>Drafts</SidebarLink>
                </Stack>
                <Stack pb="6">
                  <NavSectionTitle>Chats</NavSectionTitle>
                  <SidebarLink>Inbox</SidebarLink>
                  <SidebarLink>Personal</SidebarLink>
                  <SidebarLink>Work</SidebarLink>
                </Stack>
              </Box>

              <Box paddingLeft={2}>
                <ThemeSwitcher></ThemeSwitcher>
              </Box>
            </Flex>
          </ScrollArea>
        </Box>
      </Box>
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
          bg={mode("white", "gray.700")}
          height="100%"
          pb="6"
          rounded={{ md: "lg" }}
        >
          <Flex direction="column" height="full">
            <Flex
              w="full"
              py="4"
              justify="space-between"
              align="center"
              px="10"
            >
              <Flex align="center" minH="8">
                <MobileMenuButton onClick={toggle} isOpen={isOpen} />
                <NavBreadcrumb />
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
  );
};

export default Home;
