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
    <VStack align={"stretch"} spacing={4}>
      <HStack align="baseline" pt="4">
        <DashboardHeading icon={icon} title={title} />
      </HStack>
      {children}
    </VStack>
  );
};
