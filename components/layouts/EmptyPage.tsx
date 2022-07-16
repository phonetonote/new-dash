import { SimpleGrid } from "@chakra-ui/react";
import { LayoutProps } from "../../types/PageWithLayout";
import { Logo } from "../topbar/Logo";

const EmptyPage: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <>
      <SimpleGrid
        columns={{ base: 1, lg: 3 }}
        spacing={{ base: "8", lg: "0" }}
        maxW="7xl"
        mx="auto"
        my="2em"
        justifyItems="center"
        alignItems="center"
      >
        <Logo></Logo>

        {children}
      </SimpleGrid>
    </>
  );
};

export default EmptyPage;
