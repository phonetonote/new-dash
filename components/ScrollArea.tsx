import { Box, BoxProps, useColorModeValue as mode } from "@chakra-ui/react";
import * as React from "react";

export const ScrollArea = (props: BoxProps) => (
  <Box
    overflowY="auto"
    height="90vh"
    minH="px"
    maxH="full"
    {...props}
    sx={{
      "&::-webkit-scrollbar-track": {
        bg: "transparent",
      },
      "&::-webkit-scrollbar": {
        width: "4px",
      },
      "&::-webkit-scrollbar-thumb": {
        bg: mode("gray.300", "gray.700"),
        borderRadius: "20px",
      },
    }}
  />
);
