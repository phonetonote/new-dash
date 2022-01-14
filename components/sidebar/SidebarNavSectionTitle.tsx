import { Text, TextProps, useColorModeValue as mode } from "@chakra-ui/react";
import * as React from "react";
import typography from "../../styles/themes/foundations/typography";

export const SidebarNavSectionTitle = (props: TextProps) => (
  <Text
    fontSize="lg"
    fontWeight={typography.fontWeights.headerBold}
    paddingStart="3"
    color={mode("gray.600", "whiteAlpha.600")}
    fontFamily={typography.fonts.heading}
    {...props}
  />
);
