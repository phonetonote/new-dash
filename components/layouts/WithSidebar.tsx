import { Flex, Box, Heading } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";
import { useMobileMenuState } from "../../hooks/useMobileMenuState";
import { MobileMenuButton } from "../sidebar/MobileMenuButton";
import { Sidebar } from "../sidebar/Sidebar";
import { Topbar } from "../topbar/Topbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const { isOpen, toggle } = useMobileMenuState();

  return (
    <>
      <Flex
        height="100vh"
        bg={useColorModeValue("gray.200", "black")}
        sx={{ "--sidebar-width": "10rem" }}
      >
        <Sidebar />
        <Box
          flex="1"
          p={{ base: "0", md: "0" }}
          marginStart={{ md: "var(--sidebar-width)" }}
          position="relative"
          left={isOpen ? "var(--sidebar-width)" : "0"}
          transition="left 0.2s"
        >
          <Box
            maxW="2560px"
            bg={useColorModeValue("gray.50", "gray.900")}
            px="4"
            ml="1"
          >
            <Flex direction="column" height="full">
              <Flex
                w="full"
                justify="space-between"
                align="center"
                px="10"
                py="2"
                borderBottom="1px solid"
                borderColor={useColorModeValue("gray.200", "whiteAlpha.300")}
                display={{ base: "flex", md: "none" }}
              >
                <Flex align="center">
                  <MobileMenuButton onClick={toggle} isOpen={isOpen} />
                </Flex>
              </Flex>
              <Flex direction="column" flex="1">
                <Box flex="1" rounded="xl">
                  {children}
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Layout;
