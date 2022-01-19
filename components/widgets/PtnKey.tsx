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

type PtnKeyProps = {
  ptnKey: string;
};

export const mutedText = () =>
  useColorModeValue("blackAlpha.700", "whiteAlpha.700");

export const PtnKey = (props: PtnKeyProps) => {
  const { ptnKey } = props;
  const mutedColor = mutedText();
  const { hasCopied, onCopy } = useClipboard(ptnKey);

  return (
    <Box p="5" shadow={"thinOutline"} rounded="md">
      <VStack align="stretch" spacing="6">
        <VStack align="stretch">
          <Heading fontSize={"lg"} color={mutedColor}>
            ptn key
          </Heading>
          <Box color={mutedColor} fontSize={"sm"}>
            your ptn key, previously named roam key, is used by channels and
            clients to verify you. keep this secure.
          </Box>
        </VStack>
        <Flex>
          <InputGroup style={{ maxWidth: "420px" }}>
            <Input value={ptnKey} isReadOnly placeholder="loading..." />{" "}
            <InputRightElement
              width="4.5rem"
              children={
                <Button
                  variant={"outline"}
                  onClick={onCopy}
                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                >
                  {hasCopied ? "Copied" : "Copy"}
                </Button>
              }
            />
          </InputGroup>
        </Flex>
      </VStack>
    </Box>
  );
};
