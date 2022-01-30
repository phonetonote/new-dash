import { Heading, useColorModeValue } from "@chakra-ui/react";
import { printTitle } from "../sidebar/SidebarLink";

type DashboardHeadingProps = {
  title: string;
};

export const DashboardHeading = (props: DashboardHeadingProps) => {
  const { title } = props;
  return (
    <Heading
      fontSize={"2xl"}
      color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
    >
      {printTitle(title)}
    </Heading>
  );
};
