import {
  Box,
  BoxProps,
  Button,
  useColorModeValue as mode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSignIn } from "@clerk/nextjs";
import * as React from "react";
import { FiTwitter } from "react-icons/fi";

type TwitterButtonProps = {};

export const TwitterButton = (props: TwitterButtonProps) => {
  const { authenticateWithRedirect } = useSignIn();

  const initiateTwitterFlow = (e: React.SyntheticEvent) => {
    e.preventDefault();

    authenticateWithRedirect({
      strategy: "oauth_twitter",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };
  return (
    <Button
      variant="outline"
      leftIcon={<FiTwitter />}
      background="twitter.700"
      _hover={{ background: "twitter.800", color: "white" }}
      _active={{ background: "twitter.900", color: "white" }}
      color="white"
      onClick={(e) => initiateTwitterFlow(e)}
    >
      connect twitter
    </Button>
  );
};
