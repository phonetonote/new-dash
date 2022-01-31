import { Box, chakra, Flex, HStack, IconButton, Stack } from "@chakra-ui/react";
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
  FiArrowLeftCircle,
  FiBarChart2,
  FiCheckCircle,
  FiCornerDownLeft,
  FiCreditCard,
  FiDollarSign,
  FiGlobe,
  FiHome,
  FiKey,
  FiPackage,
  FiSend,
  FiSettings,
  FiShield,
  FiSliders,
  FiUser,
} from "react-icons/fi";
import Link from "next/link";

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
        <ScrollArea>
          <Flex
            height={"100%"}
            direction={"column"}
            justifyContent={"space-between"}
          >
            <Box>
              <Link href="/dashboard#channels" passHref={true}>
                <a>
                  <chakra.img
                    src="images/logo.svg"
                    alt="logo"
                    width="20"
                    mx="3"
                    p="3"
                    ml="0"
                    mt="-3"
                    mb="6"
                  />
                </a>
              </Link>

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
              <HStack spacing="4">
                <Link href="https://phonetonote.com" passHref>
                  <IconButton
                    title="back to home page"
                    aria-label="back to home page"
                    variant="outline"
                    isRound={true}
                    icon={<FiCornerDownLeft></FiCornerDownLeft>}
                  />
                </Link>
                <ThemeSwitcher></ThemeSwitcher>
                {/* #TODO help email button that corresponds to plan type */}
              </HStack>
            </Box>
          </Flex>
        </ScrollArea>
      </Box>
    </Box>
  );
};
