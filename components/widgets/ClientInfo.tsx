import {
  Box,
  VStack,
  Heading,
  Skeleton,
  useColorModeValue,
  SimpleGrid,
  Text,
  useClipboard,
  Badge,
  HStack,
} from "@chakra-ui/react";

import { useMutedColor } from "../../hooks/useChannelColors";
import { useKinopio } from "../../hooks/useKinopio";
import { CircleStatus } from "../indicators/circle-status";
import { MyLink } from "../MyLink";

import { KinopioClient } from "./KinopioClient";

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

  const statusComponnent = (
    <HStack pb="6">
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
      {!loading && <CircleStatus type={circleColor}></CircleStatus>}
    </HStack>
  );

  return (
    <VStack align="left">
      {statusComponnent}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">
        <Box border="thinborder" rounded="md" p="5">
          <KinopioClient />
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
            <Text>
              the <strong>phonetonote</strong> plugin is now available in{" "}
              <strong>roam depot</strong>. issues and feature requests are{" "}
              <MyLink href="https://github.com/phonetonote/ptn-roam-depot/issues">
                being tracked on github
              </MyLink>
              .
            </Text>
          </VStack>
        </Box>
      </SimpleGrid>
    </VStack>
  );
};
