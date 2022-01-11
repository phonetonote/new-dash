import { Text, TextProps, useColorModeValue as mode } from "@chakra-ui/react";
import * as React from "react";
import typography from "../styles/themes/foundations/typography";

export const NavSectionTitle = (props: TextProps) => (
  <Text
    casing="uppercase"
    fontSize="s"
    fontWeight="semibold"
    letterSpacing="wide"
    paddingStart="3"
    color={mode("gray.600", "gray.400")}
    fontFamily={typography.fonts.heading}
    {...props}
  />
);
