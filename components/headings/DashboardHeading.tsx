import { Heading, useColorModeValue } from "@chakra-ui/react";
import { ReactChild } from "react";

type DashboardHeadingProps = {
  children: ReactChild;
};

export const DashboardHeading = (props: DashboardHeadingProps) => {
  const { children } = props;
  return (
    <Heading
      fontSize={"x-large"}
      color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
    >
      {children}
    </Heading>
  );
};
