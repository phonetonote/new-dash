import { Box, chakra, Flex, HStack, IconButton, Stack } from "@chakra-ui/react";
import { SidebarNavSectionTitle } from "./SidebarNavSectionTitle";
import { SidebarLink } from "./SidebarLink";
import { ThemeSwitcher } from "../footer/ThemeSwitcher";
import { ScrollArea } from "../ScrollArea";
import {
  FiCornerDownLeft,
  FiCreditCard,
  FiKey,
  FiPackage,
  FiSend,
  FiSettings,
  FiShield,
  FiUser,
} from "react-icons/fi";
import Link from "next/link";
import { IoHelpBuoy } from "react-icons/io5";
import Image from "next/image";

export const Sidebar = () => {
  const pages = [
    {
      path: "",
      title: "dashboard",
      hashes: [
        { name: "channels", icon: <FiSend /> },
        { name: "ptn-key", icon: <FiKey /> },
        { name: "clients", icon: <FiPackage /> },
      ],
    },

    {
      path: "user",
      title: "user",
      hashes: [
        { name: "account", icon: <FiUser /> },
        { name: "security", icon: <FiShield /> },
        { name: "billing", icon: <FiCreditCard /> },
        { name: "preferences", icon: <FiSettings /> },
        { name: "help", icon: <IoHelpBuoy /> },
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
              <Link href="/#channels" passHref={true}>
                <a>
                  <Box mx="3" p="3" ml="0" mt="-3" mb="6">
                    <Image
                      src="/images/logo.svg"
                      alt="logo"
                      width="60px"
                      height="60px"
                    />
                  </Box>
                </a>
              </Link>

              {pages.map((page) => (
                <Stack pb="6" key={page.title}>
                  <SidebarNavSectionTitle>{page.title}</SidebarNavSectionTitle>
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
              </HStack>
            </Box>
          </Flex>
        </ScrollArea>
      </Box>
    </Box>
  );
};
