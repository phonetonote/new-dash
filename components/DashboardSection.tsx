import { VStack, Flex } from "@chakra-ui/react";
import { ReactChild } from "react";
import { DashboardHeading } from "./headings/DashboardHeading";
import { SubscriptionBadge } from "./widgets/SubscriptionBadge";

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
