import {
  Box,
  VStack,
  Flex,
  Heading,
  Skeleton,
  useColorModeValue,
  SimpleGrid,
  Text,
  Link as ChakraLink,
  Kbd,
  OrderedList,
  ListItem,
  Code,
  useClipboard,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import typography from "../../styles/themes/foundations/typography";
import { CircleStatus } from "../indicators/circle-status";
import { mutedText } from "./PtnKey";

type ClientInfoProps = {
  loading: boolean;
  totalSentMessages: number | undefined;
};

export const ClientInfo = (props: ClientInfoProps) => {
  const { loading, totalSentMessages } = props;
  const noMessagesReceived =
    !loading &&
    typeof totalSentMessages === "number" &&
    totalSentMessages === 0;
  const messagesReceived =
    !loading && typeof totalSentMessages === "number" && totalSentMessages > 0;
  const errorReceived = !loading && typeof totalSentMessages != "number";

  const roamSnippet = `var old = document.getElementById("phone-to-roam-script");
if (old) { old.remove(); }
var s = document.createElement("script");
s.src = "https://client.phonetoroam.com/phone-to-roam.js";
s.id = "phone-to-roam-script";
s.async = false;
s.type = "text/javascript";
s.dataset.roam_key = "e62c37f55e498db033cbc217ca52f554"
document.getElementsByTagName("head")[0].appendChild(s);
`;

  const { hasCopied, onCopy } = useClipboard(roamSnippet);

  const circleColor = messagesReceived
    ? "green"
    : noMessagesReceived
    ? "yellow"
    : "red";

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">
      <Box border="thinborder" rounded="md" p="5">
        <VStack align="stretch" spacing={"2"}>
          <Flex justify="space-between" align="baseline">
            <Heading color={mutedText()} size="md">
              status
            </Heading>
            {!loading && <CircleStatus type={circleColor}></CircleStatus>}
          </Flex>
          <Box>
            {loading && <Skeleton height="18px" width="100px" />}
            {messagesReceived && (
              <>
                <Text
                  as="span"
                  mr="1"
                  fontWeight={typography.fontWeights.textBold}
                >
                  {totalSentMessages}
                </Text>
                <span>{`message${
                  totalSentMessages > 1 ? "s" : ""
                } published`}</span>
              </>
            )}

            {noMessagesReceived && (
              <>
                <Text
                  as="span"
                  mr="1"
                  fontWeight={typography.fontWeights.textBold}
                >
                  0
                </Text>
                <span>
                  messages published, please install one of the clients
                </span>
              </>
            )}

            {errorReceived && (
              <Text
                bg={useColorModeValue("ptnRed.200", "ptnRed.600")}
                color={useColorModeValue("blackAlpha.800", "whiteAlpha.900")}
                as="div"
                p="2"
                my="2"
                rounded="md"
              >
                error fetching your published messages
              </Text>
            )}
          </Box>
        </VStack>
      </Box>
      <Box border="thinborder" rounded="md" p="5">
        <VStack align="stretch" spacing={"2"}>
          <Heading color={mutedText()} size="md">
            logseq
          </Heading>
          <Text>
            our <strong>logseq-phonetonote</strong> plugin is available in the
            logseq plugin marketplace. issues and feature requests are{" "}
            <Link
              href="https://github.com/phonetonote/phonetonote-logseq/issues"
              passHref={true}
            >
              <ChakraLink>being tracked on github</ChakraLink>
            </Link>
            .
          </Text>
        </VStack>
      </Box>
      <Box border="thinborder" rounded="md" p="5">
        <VStack align="stretch" spacing={"2"}>
          <Heading color={mutedText()} size="md">
            roam
          </Heading>
          <OrderedList stylePosition="inside" spacing="4">
            <ListItem>
              copy the client code to your clipboard
              <VStack align="stretch">
                <Code as="pre" my="2" maxWidth="100%" overflowX="scroll">
                  {roamSnippet}
                </Code>
                <Button variant={"outline"} onClick={onCopy}>
                  {hasCopied ? "copied" : "copy"}
                </Button>
              </VStack>
            </ListItem>
            <ListItem>
              open roam, go to the search bar in the top right, and type{" "}
              <Code>roam/js</Code>
            </ListItem>
            <ListItem>
              in that page type <Code>{`{{[[roam/js]]}}`}</Code> into a block
            </ListItem>
            <ListItem>
              <span>
                make a child block underneath that by pressing <Kbd>return</Kbd>
                then <Kbd>tab</Kbd>
              </span>
            </ListItem>
            <ListItem>
              in the child block type <Code>{`/Javascript`}</Code>, and select
              the <strong>JavaScript Code Block</strong> command
            </ListItem>
            <ListItem>
              paste the code copied in step 1 into the newly created code block
            </ListItem>
            <ListItem>
              make sure the parent <Code>{`{{[[roam/js]]}}`}</Code> warning is{" "}
              <Text
                as="span"
                background="ptnYellow.300"
                color="blackAlpha.900"
                px="1"
                m="1"
              >
                yellow
              </Text>
              not{" "}
              <Text
                as="span"
                background="ptnRed.600"
                px="1"
                m="1"
                color="whiteAlpha.900"
              >
                red
              </Text>
            </ListItem>
          </OrderedList>
        </VStack>
      </Box>

      <Box border="thinborder" rounded="md" p="5">
        <VStack align="stretch" spacing={"2"}>
          <Heading color={mutedText()} size="md">
            craft
          </Heading>
          <VStack spacing="4">
            <Text>
              the{" "}
              <Link
                href="https://github.com/phonetonote/phonetocraft-builds"
                passHref={true}
              >
                <ChakraLink>phonetocraft-builds repo</ChakraLink>
              </Link>{" "}
              contains <strong>.craftx</strong> files ready to download and
              install on your computer. full source code is{" "}
              <Link
                href="https://github.com/phonetonote/phonetocraft"
                passHref={true}
              >
                <ChakraLink>available here</ChakraLink>
              </Link>
              .
            </Text>
            <Text>
              please note this is an alpha release and does not contain all of
              the features of the roam client. see and participate in our{" "}
              <Link
                href="https://github.com/phonetonote/phonetocraft/discussions/2"
                passHref={true}
              >
                <ChakraLink>craft roadmap</ChakraLink>
              </Link>{" "}
              for more details.
            </Text>
          </VStack>
        </VStack>
      </Box>
    </SimpleGrid>
  );
};
