import { Box, Flex, Stack } from "@chakra-ui/react";
import {
  HiSearchCircle,
  HiOutlineInbox,
  HiBookmark,
  HiPencil,
} from "react-icons/hi";
import { NavSectionTitle } from "./NavSectionTitle";
import { ScrollArea } from "./ScrollArea";
import { SidebarLink } from "./SidebarLink";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { UserInfo } from "./UserInfo";

export const Sidebar = () => {
  return (
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
      aria-label="dashboard-links"
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
                display={{ base: "block", md: "none" }}
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
  );
};
