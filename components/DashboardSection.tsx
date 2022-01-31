import { Box, HStack, useColorModeValue, VStack } from "@chakra-ui/react";
import { ReactChild } from "react";
import { ActiveTitleContext } from "../hooks/useScrollableArea";
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
        <ActiveTitleContext.Consumer>
          {(value) => {
            return (
              <DashboardHeading icon={icon} activeTitle={value} title={title} />
            );
          }}
        </ActiveTitleContext.Consumer>
      </HStack>
      {children}
    </VStack>
  );
};
