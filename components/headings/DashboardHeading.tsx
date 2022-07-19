import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { printTitle } from "../sidebar/SidebarLink";

type DashboardHeadingProps = {
  title: string;
  icon: React.ReactElement;
};

export const HEADING_CLASS = "dashboard-heading";

export const DashboardHeading = (props: DashboardHeadingProps) => {
  const { title, icon } = props;

  const colorsToUse = useColorModeValue("blackAlpha.500", "whiteAlpha.700");

  return (
    <>
      <Heading
        fontSize={"2xl"}
        color={colorsToUse}
        className={HEADING_CLASS}
        id={title}
      >
        {printTitle(title)}
      </Heading>
      <Box fontSize="18" color={colorsToUse}>
        {icon}
      </Box>
    </>
  );
};
