import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { SignOutButton, UserProfile } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { FiLogOut } from "react-icons/fi";
import colors from "../../styles/themes/colors";
import typography from "../../styles/themes/foundations/typography";


export const ClerkProfile = () => {
  const headerColors = useColorModeValue("blackAlpha.700", "whiteAlpha.700");

  return (
    <Box padding={4}>
      <UserProfile/>
    </Box>
  );
};
