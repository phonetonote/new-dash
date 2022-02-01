import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useClipboard,
} from "@chakra-ui/react";

type CopyTextProps = {
  text: string;
};

export const CopyText = (props: CopyTextProps) => {
  const { text } = props;
  const { hasCopied, onCopy } = useClipboard(text);

  return (
    <Flex>
      <InputGroup style={{ maxWidth: "420px" }}>
        <Input
          value={text}
          isReadOnly
          placeholder="loading..."
          fontSize={{ base: "12px", md: "14px" }}
        />{" "}
        <InputRightElement width="4.5rem">
          <Button
            variant={"outline"}
            onClick={onCopy}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            {hasCopied ? "copied" : "copy"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};
