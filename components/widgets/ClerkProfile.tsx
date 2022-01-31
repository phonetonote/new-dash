import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { SignOutButton, UserProfile } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { FiLogOut } from "react-icons/fi";
import colors from "../../styles/themes/colors";
import typography from "../../styles/themes/foundations/typography";

type ClerkProfileProps = {
  only: "account" | "security";
  activeTitle: string;
};
export const ClerkProfile = (props: ClerkProfileProps) => {
  const { only, activeTitle } = props;

  const router = useRouter();

  const headerColors =
    only === activeTitle
      ? useColorModeValue("ptnGreen.600", "ptnGreen.300")
      : useColorModeValue("blackAlpha.700", "whiteAlpha.700");

  return (
    <Box
      sx={{
        ".cl-component": {
          ".cl-page-heading": {
            alignItems: "center",
          },
          ".cl-main": {
            margin: "0",
            padding: "0",
          },

          "--clerk-accounts-background-color": useColorModeValue(
            "colors.gray.50",
            "colors.gray.900"
          ),
          "--clerk-background-color": useColorModeValue(
            "colors.gray.50",
            "colors.gray.900"
          ),
          "--clerk-font-color": useColorModeValue(
            "colors.blackAlpha.700",
            "colors.whiteAlpha.700"
          ),
          "--clerk-font-color-l1": useColorModeValue(
            "colors.blackAlpha.700",
            "colors.whiteAlpha.700"
          ),

          "--clerk-primary": useColorModeValue(
            "colors.ptnTeal.400",
            "colors.whiteAlpha.700"
          ),

          "--clerk-primary-rgb": useColorModeValue(
            "colors.ptnTeal.400",
            "colors.gray.300"
          ),

          ".cl-main:empty": {
            display: "none",
          },

          ".cl-list-item": {
            "> div:last-child": {
              border: "none",
            },
            ":hover": {
              backgroundColor: useColorModeValue(
                colors.blackAlpha["100"],
                colors.whiteAlpha["100"]
              ),
            },
          },

          ".cl-list-card.cl-themed-card": {
            minH: "100%",
          },

          ".cl-title": {
            fontSize: "2xl",
            lineHeight: "100%",
            paddingTop: "16px",
            color: headerColors,
          },

          h1: {
            fontSize: "xl",
          },

          ".cl-subtitle": {
            fontSize: "1em",
            textTransform: "lowercase",
          },

          "h1, h2, h3, h4, h5, h6": {
            fontFamily: typography.fonts.heading,
            textTransform: "lowercase",
          },

          ".cl-titled-card-list button:hover": {
            backgroundColor: useColorModeValue(
              colors.blackAlpha["300"],
              colors.whiteAlpha["300"]
            ),
          },

          ".cl-themed-card p, .cl-list-item > div:first-of-type": {
            textTransform: "lowercase",
            fontSize: "16px",
          },

          ".cl-themed-card": {
            padding: "20px",
            border: "1px solid",
            borderColor: useColorModeValue(
              colors.blackAlpha["300"],
              colors.whiteAlpha["300"]
            ),
          },

          input: {
            color: colors.blackAlpha["900"],
          },
        },
      }}
    >
      <UserProfile path="/dashboard" only={only} hideNavigation={true} />
    </Box>
  );
};
