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
  FiCreditCard,
  FiDollarSign,
  FiKey,
  FiPackage,
  FiSend,
  FiSettings,
  FiShield,
  FiSliders,
  FiUser,
} from "react-icons/fi";

export const Sidebar = () => {
  const pages = [
    {
      path: "dashboard",
      hashes: [
        { name: "channels", icon: <FiSend /> },
        { name: "ptn-key", icon: <FiKey /> },
        { name: "clients", icon: <FiPackage /> },
      ],
    },

    {
      path: "user",
      hashes: [
        { name: "account", icon: <FiUser /> },
        { name: "security", icon: <FiShield /> },
        { name: "billing", icon: <FiCreditCard /> },
        { name: "preferences", icon: <FiSettings /> },
      ],
    },
  ];

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
        {/* #TODO in sidebar bar - sign out, link to marketing site */}

        <ScrollArea pt="5" pb="6">
          <Flex
            height={"100%"}
            direction={"column"}
            justifyContent={"space-between"}
          >
            {/* #TODO logo */}
            <Box>
              {pages.map((page) => (
                <Stack pb="6" key={page.path}>
                  <SidebarNavSectionTitle>{page.path}</SidebarNavSectionTitle>
                  {page.hashes.map((hash) => {
                    return (
                      <SidebarLink
                        key={`${page.path}-${hash.name}`}
                        icon={hash.icon}
                        href={`${page.path}/#${hash.name}`}
                        title={hash.name}
                      />
                    );
                  })}
                </Stack>
              ))}
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
