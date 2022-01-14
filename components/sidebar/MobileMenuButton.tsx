import { Box, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { FiMenu, FiX } from "react-icons/fi";

interface MobileMenuButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const MobileMenuButton = (props: MobileMenuButtonProps) => {
  const { onClick, isOpen } = props;
  return (
    <Box
      display={{ base: "block", md: "none" }}
      ml="-8"
      mr="2"
      as="button"
      type="button"
      rounded="md"
      p="1"
      fontSize="xl"
      color="gray.300"
      _hover={{ bg: useColorModeValue("blackAlpha.50", "blackAlpha.300") }}
      onClick={onClick}
    >
      <Box srOnly>{isOpen ? "Close Menu" : "Open Menu"}</Box>
      {isOpen ? <FiX /> : <FiMenu />}
    </Box>
  );
};
