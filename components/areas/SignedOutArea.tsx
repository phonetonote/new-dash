import { Box, Button, HStack } from "@chakra-ui/react";
import { SignInButton } from "@clerk/nextjs";

export const SignedOutArea = () => {
  const searchParams = new URLSearchParams(`${window.location.search}`);

  return (
    <Box minH="100vh" p="4">
      <HStack>
        <SignInButton
          redirectUrl={`${process.env.NEXT_PUBLIC_NEW_DASHBOARD_SITE}/${
            window.location.pathname
          }?${searchParams.toString()}`}
        >
          <Button variant="ptn">sign in</Button>
        </SignInButton>
        <Box ml="2"> to view this page</Box>
      </HStack>
    </Box>
  );
};
