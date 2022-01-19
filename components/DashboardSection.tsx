import { VStack } from "@chakra-ui/react";
import { ReactChild } from "react";
import { DashboardHeading } from "./headings/DashboardHeading";

type DashboardSectionProps = {
  title: string;
  children: ReactChild;
};

export const DashboardSection = (props: DashboardSectionProps) => {
  const { title, children } = props;
  return (
    <VStack align={"stretch"} spacing={4}>
      <DashboardHeading>{title}</DashboardHeading>
      {children}
    </VStack>
  );
};
