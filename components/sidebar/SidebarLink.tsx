import {
  Box,
  BoxProps,
  createIcon,
  HStack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { HiChevronRight, HiOutlineChevronRight } from "react-icons/hi";

interface SidebarLinkProps extends BoxProps {
  icon?: React.ReactElement;
  avatar?: React.ReactElement;
}

export const SidebarLink = (props: SidebarLinkProps) => {
  const { children, icon = <HiOutlineChevronRight />, avatar, ...rest } = props;
  return (
    <Box
      as="a"
      marginEnd="2"
      fontSize="sm"
      display="block"
      px="3"
      py="1"
      rounded="md"
      cursor="pointer"
      color={mode("black", "white")}
      _hover={{
        color: mode("green.700", "ptnGreen.200"),
        bg: mode("gray.100", "gray.900"),
      }}
      className="group"
      fontWeight="medium"
      transition="background .1s ease-out"
      {...rest}
    >
      <HStack>
        <Box opacity={avatar ? 1 : 0.5} _groupHover={{ opacity: 1 }}>
          {avatar || icon}
        </Box>
        <Text>{children}</Text>
      </HStack>
    </Box>
  );
};
