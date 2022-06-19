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
  Badge,
} from "@chakra-ui/react";
import Link from "next/link";
import { useMutedColor } from "../../hooks/useChannelColors";
import typography from "../../styles/themes/foundations/typography";
import { CircleStatus } from "../indicators/circle-status";
import { MyLink } from "../MyLink";

type ClientInfoProps = {
  loading: boolean;
  totalSentMessages: number | undefined;
  ptnKey: string;
};

export const ClientInfo = (props: ClientInfoProps) => {
  const { loading, totalSentMessages, ptnKey } = props;
  const mutedColor = useMutedColor();

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
s.dataset.roam_key = "${ptnKey}"
document.getElementsByTagName("head")[0].appendChild(s);
`;

  const { hasCopied, onCopy } = useClipboard(roamSnippet);

  const circleColor = messagesReceived
    ? "received"
    : noMessagesReceived
    ? "ready"
    : "notReady";

  const bgColor = useColorModeValue("ptnRed.200", "ptnRed.600");
  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.900");

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">
      <Box border="thinborder" rounded="md" p="5">
        <VStack align="stretch" spacing={"2"}>
          <Flex justify="space-between" align="baseline">
            <Heading color={mutedColor} size="md">
              status
            </Heading>
            {!loading && <CircleStatus type={circleColor}></CircleStatus>}
          </Flex>
          <Box>
            {loading && <Skeleton height="18px" width="100px" />}
            {messagesReceived && (
              <>
                <Badge variant="outline">{totalSentMessages}</Badge>
                <span>{` message${
                  totalSentMessages > 1 ? "s" : ""
                } published`}</span>
              </>
            )}

            {noMessagesReceived && (
              <>
                <Badge variant="outline">0</Badge> messages published, please
                install one of the clients
              </>
            )}

            {errorReceived && (
              <Text
                bg={bgColor}
                color={textColor}
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
          <Heading color={mutedColor} size="md">
            logseq
          </Heading>
          <Text>
            our <strong>logseq-phonetonote</strong> plugin is available in the
            logseq plugin marketplace. after installing, open the plugin
            settings to set your ptn key and configure the plugin. issues and
            feature requests are{" "}
            <MyLink href="https://github.com/phonetonote/phonetonote-logseq/issues">
              being tracked on github
            </MyLink>
            .
          </Text>
        </VStack>
      </Box>
      <Box border="thinborder" rounded="md" p="5">
        <VStack align="stretch" spacing={"2"}>
          <Heading color={mutedColor} size="md">
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
                color="white"
              >
                red
              </Text>
            </ListItem>
          </OrderedList>
        </VStack>
      </Box>

      <Box border="thinborder" rounded="md" p="5">
        <VStack align="stretch" spacing={"2"}>
          <Heading color={mutedColor} size="md">
            craft
          </Heading>
          <VStack spacing="4">
            <Text>
              the{" "}
              <MyLink href="https://github.com/phonetonote/phonetocraft-builds">
                phonetocraft-builds repo
              </MyLink>{" "}
              contains <strong>.craftx</strong> files ready to download and
              install on your computer. full source code is{" "}
              <MyLink href="https://github.com/phonetonote/phonetocraft">
                available here
              </MyLink>
              .
            </Text>
            <Text>
              please note this is an alpha release and does not contain all of
              the features of the roam client. see and participate in our{" "}
              <MyLink href="https://github.com/phonetonote/phonetocraft/discussions/2">
                craft roadmap
              </MyLink>{" "}
              for more details.
            </Text>
          </VStack>
        </VStack>
      </Box>
    </SimpleGrid>
  );
};
