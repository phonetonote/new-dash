import { Flex, Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";
import { useMobileMenuState } from "../../hooks/useMobileMenuState";
import { LayoutProps } from "../../types/PageWithLayout";
import { MobileMenuButton } from "../sidebar/MobileMenuButton";
import { Topbar } from "../topbar/Topbar";

const WithTopbar: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const color = useColorModeValue("black", "white");
  const { isOpen, toggle } = useMobileMenuState();

  return (
    <>
      <Topbar />
      <SimpleGrid
        columns={{ base: 1, lg: 3 }}
        spacing={{ base: "8", lg: "0" }}
        maxW="7xl"
        mx="auto"
        justifyItems="center"
        alignItems="center"
      >
        {children}
      </SimpleGrid>
    </>
  );
};

export default WithTopbar;
