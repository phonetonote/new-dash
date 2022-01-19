import { Box, Flex, Stack } from "@chakra-ui/react";
import {
  HiSearchCircle,
  HiOutlineInbox,
  HiBookmark,
  HiPencil,
} from "react-icons/hi";
import { SidebarNavSectionTitle } from "./SidebarNavSectionTitle";
import { SidebarLink } from "./SidebarLink";
import { UserInfo } from "./UserInfo";
import { ThemeSwitcher } from "../footer/ThemeSwitcher";
import { ScrollArea } from "../ScrollArea";
import {
  FiBarChart2,
  FiCheckCircle,
  FiDollarSign,
  FiSettings,
  FiSliders,
  FiUser,
} from "react-icons/fi";

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
        {/* #TODO logo */}
        {/* <UserInfo name="Esther Collins" email="esther-colls@chakra.com" /> */}
        <ScrollArea pt="5" pb="6">
          <Flex
            height={"100%"}
            direction={"column"}
            justifyContent={"space-between"}
          >
            <Box>
              <Stack pb="6">
                <SidebarNavSectionTitle>dashboard</SidebarNavSectionTitle>

                <SidebarLink icon={<FiBarChart2 />}>channels</SidebarLink>
                <SidebarLink icon={<FiCheckCircle />}>installation</SidebarLink>
                <SidebarLink icon={<FiUser />}>user settings</SidebarLink>
                <SidebarLink icon={<FiSettings />}>preferences</SidebarLink>
                <SidebarLink icon={<FiSliders />}>
                  your subscription
                </SidebarLink>
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
