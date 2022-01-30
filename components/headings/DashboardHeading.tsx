import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { printTitle } from "../sidebar/SidebarLink";

type DashboardHeadingProps = {
  activeTitle: string;
  title: string;
  icon: React.ReactElement;
};

export const HEADING_CLASS = "dashboard-heading";

export const DashboardHeading = (props: DashboardHeadingProps) => {
  const { title, activeTitle, icon } = props;

  const colors =
    title === activeTitle
      ? useColorModeValue("ptnGreen.700", "ptnGreen.300")
      : useColorModeValue("blackAlpha.700", "whiteAlpha.700");
  return (
    <>
      <Heading fontSize={"2xl"} color={colors} className={HEADING_CLASS}>
        {printTitle(title)}
      </Heading>
      <Box fontSize="18" color={colors}>
        {icon}
      </Box>
    </>
  );
};
