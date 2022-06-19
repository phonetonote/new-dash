import { Flex, FlexProps, Text, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";

export const BillingCardBadge = (props: FlexProps) => {
  const { children, ...flexProps } = props;
  return (
    <Flex
      bg={useColorModeValue("ptnGreen.700", "ptnGreen.300")}
      position="absolute"
      right={-20}
      top={6}
      width="240px"
      transform="rotate(45deg)"
      py={2}
      justifyContent="center"
      alignItems="center"
      {...flexProps}
    >
      <Text
        fontSize="xs"
        textTransform="uppercase"
        fontWeight="bold"
        letterSpacing="wider"
        color={useColorModeValue("white", "gray.800")}
      >
        {children}
      </Text>
    </Flex>
  );
};
