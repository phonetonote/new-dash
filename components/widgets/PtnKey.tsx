import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useClipboard,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { CopyText } from "./CopyText";

type PtnKeyProps = {
  ptnKey: string;
};

export const mutedText = () =>
  useColorModeValue("blackAlpha.700", "whiteAlpha.700");

export const PtnKey = (props: PtnKeyProps) => {
  const { ptnKey } = props;
  const mutedColor = mutedText();

  return (
    <Box>
      <VStack align="stretch" spacing="6">
        <VStack align="stretch">
          <Box color={mutedColor} fontSize={"sm"}>
            your ptn key, previously named roam key, is used by channels and
            clients to verify you. keep this secure.
          </Box>
        </VStack>
        <CopyText text={ptnKey} />
      </VStack>
    </Box>
  );
};
