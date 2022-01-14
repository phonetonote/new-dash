import {
  Box,
  chakra,
  HTMLChakraProps,
  useToken,
  VisuallyHidden,
} from "@chakra-ui/react";
import * as React from "react";

export const Logo = (
  props: HTMLChakraProps<"svg"> & { iconColor?: string }
) => (
  <Box as="a" href="#" rel="home">
    <VisuallyHidden>{process.env.NEXT_PUBLIC_SITE_NAME}</VisuallyHidden>
    <chakra.img src="images/logo.svg" alt="logo" width={12} />
  </Box>
);
