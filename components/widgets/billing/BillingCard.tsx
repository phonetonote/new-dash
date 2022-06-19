import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { BillingCardBadge } from "./BillingCardBadge";

export interface BillingCardProps extends BoxProps {
  isPopular?: boolean;
}

export const BillingCard = (props: BillingCardProps) => {
  const { children, isPopular, ...rest } = props;
  return (
    <Box
      bg={useColorModeValue("gray.200", "gray.800")}
      position="relative"
      px="8"
      pb="4"
      pt="8"
      overflow="hidden"
      shadow="boldLg"
      maxW="md"
      width="100%"
      {...rest}
    >
      {isPopular && <BillingCardBadge>Popular</BillingCardBadge>}
      {children}
    </Box>
  );
};
