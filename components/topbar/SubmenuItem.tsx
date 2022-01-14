import {
  Box,
  Center,
  chakra,
  HStack,
  HTMLChakraProps,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { FaChevronRight } from "react-icons/fa";
import typography from "../../styles/themes/foundations/typography";
import { navColors } from "./NavLink";

interface SubmenuItemProps extends HTMLChakraProps<"a"> {
  title: string;
  icon?: React.ReactElement;
  children: React.ReactNode;
  href: string;
}

export const SubmenuItem = (props: SubmenuItemProps) => {
  const { title, icon, children, href, ...rest } = props;
  return (
    <chakra.a
      className="group"
      href={href}
      m="-3"
      p="3"
      display="flex"
      alignItems="flex-start"
      transition="all 0.2s"
      rounded="lg"
      _hover={{ bg: mode("blackAlpha.200", "whiteAlpha.200") }}
      _active={{ bg: mode("blackAlpha.300", "whiteAlpha.300") }}
      _focus={{ shadow: "outline" }}
      {...rest}
    >
      <Center
        aria-hidden
        as="span"
        flexShrink={0}
        w="10"
        h="10"
        fontSize="3xl"
        color={mode("gray.700", "ptnGreen.100")}
      >
        {icon}
      </Center>
      <Box marginStart="3" as="dl">
        <HStack as="dt">
          <Text
            fontFamily={typography.fonts.heading}
            fontWeight={typography.fontWeights.headerBold}
            color={mode(navColors.light.color, navColors.dark.color)}
            _groupHover={{
              color: mode(navColors.light.hover, navColors.dark.hover),
            }}
          >
            {title}
          </Text>
        </HStack>
        <Text as="dd" color={mode("gray.500", "gray.400")}>
          {children}
        </Text>
      </Box>
    </chakra.a>
  );
};
