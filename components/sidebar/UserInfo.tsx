import {
  Avatar,
  Box,
  HStack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";

interface UserInfoProps {
  name: string;
  image?: string;
  email: string;
}

export const UserInfo = (props: UserInfoProps) => {
  const { name, image, email } = props;
  return (
    <Box
      as="a"
      href="#"
      p="3"
      display="block"
      transition="background 0.1s"
      rounded="xl"
      _hover={{ bg: "whiteAlpha.200" }}
      whiteSpace="nowrap"
    >
      <HStack display="inline-flex">
        <Avatar size="sm" name={name} src={image} />
        <Box lineHeight="1">
          <Text fontWeight="semibold" color={mode("ptnTeal.800", "gray.100")}>
            {name}
          </Text>
          <Text fontSize="xs" mt="1" color={mode("ptnTeal.600", "gray.300")}>
            {email}
          </Text>
        </Box>
      </HStack>{" "}
    </Box>
  );
};
