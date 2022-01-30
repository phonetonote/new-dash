import { Box, HStack, useColorModeValue, VStack } from "@chakra-ui/react";
import { ReactChild } from "react";
import { DashboardHeading } from "./headings/DashboardHeading";

type DashboardSectionProps = {
  id?: string;
  title: string;
  children: ReactChild;
  icon: React.ReactElement;
};

export const DashboardSection = (props: DashboardSectionProps) => {
  const { title, children, icon } = props;

  return (
    <VStack align={"stretch"} spacing={4} id={title}>
      <HStack align="baseline" pt="4">
        <DashboardHeading title={title} />
        <Box
          fontSize="18"
          color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
        >
          {icon}
        </Box>
      </HStack>
      {children}
    </VStack>
  );
};
